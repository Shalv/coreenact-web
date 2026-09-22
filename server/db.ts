import pg from "pg";

export interface EnquiryRecord {
  id: string;
  source: "contact_page" | "book_consultation" | "quick_inquiry" | string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  interest?: string;
  office?: string;
  timeframe?: string;
  notes?: string;
  receivedAt: string;
  emailDispatched: boolean;
  dbSaved?: boolean;
  dbType?: "postgres" | "in-memory";
}

// In-memory fallback cache
const inMemoryCache: EnquiryRecord[] = [];

// Lazy PostgreSQL Pool
let pgPool: pg.Pool | null = null;
let pgTableInitialized = false;

/**
 * Checks if a PostgreSQL connection URL is present in environment variables
 */
export function hasPostgresConfig(): boolean {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

/**
 * Initialize PostgreSQL Pool lazily
 */
function getPgPool(): pg.Pool | null {
  if (pgPool) return pgPool;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    return null;
  }

  try {
    const config: pg.PoolConfig = {
      connectionString,
      ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
    };

    pgPool = new pg.Pool(config);
    pgPool.on("error", (err) => {
      console.warn("[Postgres Pool Idle Error]:", err.message);
    });
    return pgPool;
  } catch (err: any) {
    console.error("[Postgres Init Error]:", err.message);
    return null;
  }
}

/**
 * Ensure PostgreSQL enquiries table exists
 */
async function ensurePgTable(): Promise<boolean> {
  if (pgTableInitialized) return true;
  const pool = getPgPool();
  if (!pool) return false;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS coreenact_enquiries (
      id VARCHAR(100) PRIMARY KEY,
      source VARCHAR(100) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      phone VARCHAR(100),
      service VARCHAR(255),
      interest VARCHAR(255),
      office VARCHAR(255),
      timeframe VARCHAR(255),
      notes TEXT,
      received_at TIMESTAMPTZ NOT NULL,
      email_dispatched BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  try {
    await pool.query(createTableQuery);
    pgTableInitialized = true;
    return true;
  } catch (err: any) {
    console.error("[Postgres] Table initialization failed:", err.message);
    return false;
  }
}

/**
 * Save enquiry to Database (PostgreSQL if configured, falling back to in-memory store)
 */
export async function saveEnquiryToDb(enquiry: EnquiryRecord): Promise<{
  success: boolean;
  storage: "postgres" | "in-memory";
  recordId: string;
  error?: string;
}> {
  // Cache in memory
  inMemoryCache.unshift(enquiry);
  if (inMemoryCache.length > 200) {
    inMemoryCache.pop();
  }

  // Try PostgreSQL if configured
  const pool = getPgPool();
  if (pool) {
    try {
      await ensurePgTable();
      const insertQuery = `
        INSERT INTO coreenact_enquiries (
          id, source, name, email, company, phone, service, interest, office, timeframe, notes, received_at, email_dispatched
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id;
      `;

      await pool.query(insertQuery, [
        enquiry.id,
        enquiry.source,
        enquiry.name,
        enquiry.email,
        enquiry.company || "",
        enquiry.phone || "",
        enquiry.service || "",
        enquiry.interest || "",
        enquiry.office || "",
        enquiry.timeframe || "",
        enquiry.notes || "",
        enquiry.receivedAt,
        enquiry.emailDispatched || false,
      ]);

      console.log(`[Postgres SUCCESS] Saved enquiry ${enquiry.id}`);
      enquiry.dbSaved = true;
      enquiry.dbType = "postgres";
      return {
        success: true,
        storage: "postgres",
        recordId: enquiry.id,
      };
    } catch (pgErr: any) {
      console.error("[Postgres Error]:", pgErr.message);
    }
  }

  // Fallback to in-memory
  enquiry.dbSaved = false;
  enquiry.dbType = "in-memory";
  return {
    success: true,
    storage: "in-memory",
    recordId: enquiry.id,
  };
}

/**
 * Fetch enquiries from active storage (PostgreSQL or in-memory)
 */
export async function getEnquiriesFromDb(limit = 50): Promise<{
  source: "postgres" | "in-memory";
  count: number;
  enquiries: EnquiryRecord[];
}> {
  const pool = getPgPool();
  if (pool) {
    try {
      const result = await pool.query(
        `SELECT * FROM coreenact_enquiries ORDER BY received_at DESC LIMIT $1;`,
        [limit]
      );
      const mapped: EnquiryRecord[] = result.rows.map((row) => ({
        id: row.id,
        source: row.source,
        name: row.name,
        email: row.email,
        company: row.company,
        phone: row.phone,
        service: row.service,
        interest: row.interest,
        office: row.office,
        timeframe: row.timeframe,
        notes: row.notes,
        receivedAt: row.received_at ? new Date(row.received_at).toISOString() : new Date().toISOString(),
        emailDispatched: Boolean(row.email_dispatched),
        dbSaved: true,
        dbType: "postgres",
      }));
      return {
        source: "postgres",
        count: mapped.length,
        enquiries: mapped,
      };
    } catch (err: any) {
      console.warn("[Postgres Scan Warning]:", err.message);
    }
  }

  return {
    source: "in-memory",
    count: inMemoryCache.length,
    enquiries: inMemoryCache.slice(0, limit),
  };
}

/**
 * Diagnostic health check for Database connectivity
 */
export async function getDbStatus(): Promise<{
  configuredProvider: "postgres" | "none";
  activeStorage: "postgres" | "in-memory";
  postgres: {
    configured: boolean;
    hasConnectionString: boolean;
    status: "connected" | "not-configured" | "error";
    errorDetails?: string;
  };
  inMemoryRecordsCount: number;
}> {
  const hasPg = hasPostgresConfig();
  let pgStatus: "connected" | "not-configured" | "error" = "not-configured";
  let pgError: string | undefined;

  if (hasPg) {
    try {
      const pool = getPgPool();
      if (pool) {
        const client = await pool.connect();
        await client.query("SELECT 1;");
        client.release();
        pgStatus = "connected";
      }
    } catch (err: any) {
      pgStatus = "error";
      pgError = err.message;
    }
  }

  const configuredProvider = hasPg ? "postgres" : "none";
  const activeStorage = pgStatus === "connected" ? "postgres" : "in-memory";

  return {
    configuredProvider,
    activeStorage,
    postgres: {
      configured: hasPg,
      hasConnectionString: Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL),
      status: pgStatus,
      errorDetails: pgError,
    },
    inMemoryRecordsCount: inMemoryCache.length,
  };
}
