import { DynamoDBClient, CreateTableCommand, DescribeTableCommand, ResourceNotFoundException } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
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
  dbType?: "dynamodb" | "rds-postgres" | "in-memory";
}

// In-memory fallback cache
const inMemoryCache: EnquiryRecord[] = [];

// Lazy AWS DynamoDB Client
let ddbDocClient: DynamoDBDocumentClient | null = null;
let ddbInitAttempted = false;
let ddbInitError: string | null = null;

// Lazy PostgreSQL Pool
let pgPool: pg.Pool | null = null;
let pgTableInitialized = false;

/**
 * Checks if AWS DynamoDB credentials are present in environment variables
 */
export function hasAwsDynamoConfig(): boolean {
  return Boolean(
    (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) ||
    process.env.AWS_DYNAMODB_TABLE
  );
}

/**
 * Checks if AWS RDS / PostgreSQL connection URL is present
 */
export function hasAwsRdsConfig(): boolean {
  return Boolean(
    process.env.DATABASE_URL ||
    process.env.AWS_RDS_URL ||
    process.env.AWS_PG_HOST ||
    process.env.POSTGRES_URL
  );
}

/**
 * Initialize DynamoDB Document Client lazily
 */
function getDynamoDocClient(): DynamoDBDocumentClient | null {
  if (ddbDocClient) return ddbDocClient;
  if (ddbInitAttempted && ddbInitError) return null;

  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || "us-east-1";

  if (!accessKeyId || !secretAccessKey) {
    return null;
  }

  try {
    const rawClient = new DynamoDBClient({
      region,
      credentials: {
        accessKeyId: accessKeyId.trim(),
        secretAccessKey: secretAccessKey.trim(),
        sessionToken: process.env.AWS_SESSION_TOKEN?.trim(),
      },
    });

    ddbDocClient = DynamoDBDocumentClient.from(rawClient, {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });
    ddbInitAttempted = true;
    ddbInitError = null;
    return ddbDocClient;
  } catch (err: any) {
    ddbInitAttempted = true;
    ddbInitError = err.message || "Failed to initialize DynamoDB client";
    console.error("[AWS DynamoDB Init Error]:", ddbInitError);
    return null;
  }
}

/**
 * Ensures DynamoDB table exists or attempts to create it
 */
async function ensureDynamoTable(tableName: string): Promise<boolean> {
  const client = getDynamoDocClient();
  if (!client) return false;

  const region = process.env.AWS_REGION || "us-east-1";
  const rawClient = new DynamoDBClient({
    region,
    credentials: {
      accessKeyId: (process.env.AWS_ACCESS_KEY_ID || "").trim(),
      secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY || "").trim(),
    },
  });

  try {
    await rawClient.send(new DescribeTableCommand({ TableName: tableName }));
    return true;
  } catch (err: any) {
    if (err instanceof ResourceNotFoundException || err.name === "ResourceNotFoundException") {
      try {
        console.log(`[AWS DynamoDB] Table '${tableName}' not found. Attempting auto-creation...`);
        await rawClient.send(
          new CreateTableCommand({
            TableName: tableName,
            KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
            AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
            BillingMode: "PAY_PER_REQUEST", // On-demand capacity: free tier friendly
          })
        );
        console.log(`[AWS DynamoDB] Table '${tableName}' created successfully with PAY_PER_REQUEST billing.`);
        return true;
      } catch (createErr: any) {
        console.warn(`[AWS DynamoDB] Could not auto-create table '${tableName}':`, createErr.message);
        return false;
      }
    }
    return false;
  }
}

/**
 * Initialize PostgreSQL Pool lazily
 */
function getPgPool(): pg.Pool | null {
  if (pgPool) return pgPool;

  const connectionString =
    process.env.DATABASE_URL ||
    process.env.AWS_RDS_URL ||
    process.env.POSTGRES_URL;

  if (!connectionString && !process.env.AWS_PG_HOST) {
    return null;
  }

  try {
    const config: pg.PoolConfig = connectionString
      ? {
          connectionString,
          ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false },
          connectionTimeoutMillis: 5000,
        }
      : {
          host: process.env.AWS_PG_HOST,
          port: Number(process.env.AWS_PG_PORT) || 5432,
          database: process.env.AWS_PG_DATABASE || "postgres",
          user: process.env.AWS_PG_USER || "postgres",
          password: process.env.AWS_PG_PASSWORD,
          ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false },
          connectionTimeoutMillis: 5000,
        };

    pgPool = new pg.Pool(config);
    return pgPool;
  } catch (err: any) {
    console.error("[AWS RDS Postgres Init Error]:", err.message);
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
    console.error("[AWS RDS Postgres] Table initialization failed:", err.message);
    return false;
  }
}

/**
 * Save enquiry to AWS (DynamoDB or RDS Postgres), falling back to in-memory store
 */
export async function saveEnquiryToDb(enquiry: EnquiryRecord): Promise<{
  success: boolean;
  storage: "dynamodb" | "rds-postgres" | "in-memory";
  recordId: string;
  error?: string;
}> {
  // Always cache in memory as immediate fallback
  inMemoryCache.unshift(enquiry);
  if (inMemoryCache.length > 200) {
    inMemoryCache.pop();
  }

  // 1. Try AWS DynamoDB (preferred for Vercel serverless)
  const ddb = getDynamoDocClient();
  const ddbTableName = process.env.AWS_DYNAMODB_TABLE || "coreenact_enquiries";

  if (ddb) {
    try {
      await ddb.send(
        new PutCommand({
          TableName: ddbTableName,
          Item: {
            ...enquiry,
            ttl: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // 1 year optional TTL
          },
        })
      );

      console.log(`[AWS DynamoDB SUCCESS] Saved enquiry ${enquiry.id} to table '${ddbTableName}'`);
      enquiry.dbSaved = true;
      enquiry.dbType = "dynamodb";
      return {
        success: true,
        storage: "dynamodb",
        recordId: enquiry.id,
      };
    } catch (ddbErr: any) {
      console.warn(`[AWS DynamoDB Error] PutItem failed on table '${ddbTableName}':`, ddbErr.message);

      // Try table creation once if table not found
      if (ddbErr.name === "ResourceNotFoundException") {
        const created = await ensureDynamoTable(ddbTableName);
        if (created) {
          try {
            await ddb.send(
              new PutCommand({
                TableName: ddbTableName,
                Item: enquiry,
              })
            );
            enquiry.dbSaved = true;
            enquiry.dbType = "dynamodb";
            return {
              success: true,
              storage: "dynamodb",
              recordId: enquiry.id,
            };
          } catch (retryErr: any) {
            console.error("[AWS DynamoDB Retry Error]:", retryErr.message);
          }
        }
      }
    }
  }

  // 2. Try AWS RDS / PostgreSQL if configured
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

      console.log(`[AWS RDS Postgres SUCCESS] Saved enquiry ${enquiry.id}`);
      enquiry.dbSaved = true;
      enquiry.dbType = "rds-postgres";
      return {
        success: true,
        storage: "rds-postgres",
        recordId: enquiry.id,
      };
    } catch (pgErr: any) {
      console.error("[AWS RDS Postgres Error]:", pgErr.message);
    }
  }

  // 3. Fallback to in-memory
  enquiry.dbSaved = false;
  enquiry.dbType = "in-memory";
  return {
    success: true,
    storage: "in-memory",
    recordId: enquiry.id,
    error: "AWS database not configured or connection failed. Saved to server runtime memory.",
  };
}

/**
 * Fetch enquiries from active database (DynamoDB, RDS, or in-memory)
 */
export async function getEnquiriesFromDb(limit = 50): Promise<{
  source: "dynamodb" | "rds-postgres" | "in-memory";
  count: number;
  enquiries: EnquiryRecord[];
}> {
  // 1. Try DynamoDB
  const ddb = getDynamoDocClient();
  const ddbTableName = process.env.AWS_DYNAMODB_TABLE || "coreenact_enquiries";
  if (ddb) {
    try {
      const result = await ddb.send(
        new ScanCommand({
          TableName: ddbTableName,
          Limit: limit,
        })
      );
      const items = (result.Items || []) as EnquiryRecord[];
      // Sort newest first
      items.sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());
      return {
        source: "dynamodb",
        count: items.length,
        enquiries: items,
      };
    } catch (err: any) {
      console.warn("[AWS DynamoDB Scan Warning]:", err.message);
    }
  }

  // 2. Try RDS Postgres
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
        dbType: "rds-postgres",
      }));
      return {
        source: "rds-postgres",
        count: mapped.length,
        enquiries: mapped,
      };
    } catch (err: any) {
      console.warn("[AWS RDS Scan Warning]:", err.message);
    }
  }

  // 3. Fallback to memory
  return {
    source: "in-memory",
    count: inMemoryCache.length,
    enquiries: inMemoryCache.slice(0, limit),
  };
}

/**
 * Diagnostic health check for AWS Database connectivity
 */
export async function getDbStatus(): Promise<{
  configuredProvider: "dynamodb" | "rds-postgres" | "none";
  activeStorage: "dynamodb" | "rds-postgres" | "in-memory";
  dynamoDb: {
    configured: boolean;
    region: string;
    tableName: string;
    hasAccessKey: boolean;
    hasSecretKey: boolean;
    status: "connected" | "not-configured" | "error";
    errorDetails?: string;
  };
  rdsPostgres: {
    configured: boolean;
    hasConnectionString: boolean;
    status: "connected" | "not-configured" | "error";
    errorDetails?: string;
  };
  inMemoryRecordsCount: number;
  instructions: string;
}> {
  const hasDynamo = Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);
  const dynamoTable = process.env.AWS_DYNAMODB_TABLE || "coreenact_enquiries";
  const dynamoRegion = process.env.AWS_REGION || "us-east-1";

  let dynamoStatus: "connected" | "not-configured" | "error" = "not-configured";
  let dynamoError: string | undefined;

  if (hasDynamo) {
    try {
      const client = getDynamoDocClient();
      if (client) {
        // Ping DynamoDB with DescribeTable or small scan
        const rawClient = new DynamoDBClient({
          region: dynamoRegion,
          credentials: {
            accessKeyId: (process.env.AWS_ACCESS_KEY_ID || "").trim(),
            secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY || "").trim(),
          },
        });
        await rawClient.send(new DescribeTableCommand({ TableName: dynamoTable }));
        dynamoStatus = "connected";
      }
    } catch (err: any) {
      dynamoStatus = "error";
      dynamoError = err.message;
    }
  }

  const hasRds = hasAwsRdsConfig();
  let rdsStatus: "connected" | "not-configured" | "error" = "not-configured";
  let rdsError: string | undefined;

  if (hasRds) {
    try {
      const pool = getPgPool();
      if (pool) {
        const client = await pool.connect();
        await client.query("SELECT 1;");
        client.release();
        rdsStatus = "connected";
      }
    } catch (err: any) {
      rdsStatus = "error";
      rdsError = err.message;
    }
  }

  const configuredProvider = hasDynamo ? "dynamodb" : hasRds ? "rds-postgres" : "none";
  const activeStorage =
    dynamoStatus === "connected" ? "dynamodb" : rdsStatus === "connected" ? "rds-postgres" : "in-memory";

  return {
    configuredProvider,
    activeStorage,
    dynamoDb: {
      configured: hasDynamo,
      region: dynamoRegion,
      tableName: dynamoTable,
      hasAccessKey: Boolean(process.env.AWS_ACCESS_KEY_ID),
      hasSecretKey: Boolean(process.env.AWS_SECRET_ACCESS_KEY),
      status: dynamoStatus,
      errorDetails: dynamoError,
    },
    rdsPostgres: {
      configured: hasRds,
      hasConnectionString: Boolean(process.env.DATABASE_URL || process.env.AWS_RDS_URL),
      status: rdsStatus,
      errorDetails: rdsError,
    },
    inMemoryRecordsCount: inMemoryCache.length,
    instructions:
      "To connect Vercel with AWS for form storage, add the AWS environment variables in your Vercel Project Dashboard (Settings > Environment Variables) and redeploy.",
  };
}
