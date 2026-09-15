import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Database,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  X,
  ExternalLink,
  ShieldCheck,
  Layers,
  Inbox,
  ArrowRight,
} from "lucide-react";

interface AwsDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DbStatusResponse {
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
}

interface EnquiryItem {
  id: string;
  source: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  receivedAt: string;
  dbType?: string;
}

export const AwsDatabaseModal: React.FC<AwsDatabaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [status, setStatus] = useState<DbStatusResponse | null>(null);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"status" | "setup" | "records">("status");

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const [resStatus, resEnquiries] = await Promise.all([
        fetch("/api/db-status"),
        fetch("/api/enquiries?limit=10"),
      ]);
      const statusData = await resStatus.json();
      const enquiriesData = await resEnquiries.json();
      setStatus(statusData);
      setEnquiries(enquiriesData.enquiries || []);
    } catch (err) {
      console.error("Failed to fetch DB status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  const vercelEnvSnippet = `# Vercel Project Settings > Environment Variables
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_DYNAMODB_TABLE=coreenact_enquiries
NOTIFICATION_EMAIL=coreenacterp@gmail.com`;

  const copySnippet = () => {
    navigator.clipboard.writeText(vercelEnvSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>AWS Database Connection</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Vercel + AWS
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Persistent database storage for website inquiries & contact forms
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchStatus}
                disabled={loading}
                title="Refresh Status"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-600" : ""}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("status")}
              className={`py-3 px-4 border-b-2 transition cursor-pointer ${
                activeTab === "status"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Live Connection
            </button>
            <button
              onClick={() => setActiveTab("setup")}
              className={`py-3 px-4 border-b-2 transition cursor-pointer ${
                activeTab === "setup"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Vercel Configuration Guide
            </button>
            <button
              onClick={() => setActiveTab("records")}
              className={`py-3 px-4 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "records"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <span>Submissions</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {enquiries.length}
              </span>
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
            {activeTab === "status" && (
              <div className="space-y-6">
                {/* Active Storage Status Card */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400">
                      Active Storage Backend
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      {status?.activeStorage === "dynamodb" && (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>AWS DynamoDB (Serverless)</span>
                        </>
                      )}
                      {status?.activeStorage === "rds-postgres" && (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>AWS RDS (PostgreSQL)</span>
                        </>
                      )}
                      {status?.activeStorage === "in-memory" && (
                        <>
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                          <span>Serverless Memory (Fallback Active)</span>
                        </>
                      )}
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      status?.activeStorage !== "in-memory"
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                        : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                    }`}
                  >
                    {status?.activeStorage !== "in-memory" ? "AWS Connected" : "Awaiting AWS Keys"}
                  </span>
                </div>

                {/* DynamoDB Section */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <span>AWS DynamoDB</span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-normal">
                        (Recommended for Vercel)
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {status?.dynamoDb.status === "connected" ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                        </span>
                      ) : status?.dynamoDb.configured ? (
                        <span className="text-amber-600 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Checked on write
                        </span>
                      ) : (
                        <span className="text-slate-400">Not configured yet</span>
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-400 block text-[10px]">Table Name</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {status?.dynamoDb.tableName || "coreenact_enquiries"}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80">
                      <span className="text-slate-400 block text-[10px]">AWS Region</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {status?.dynamoDb.region || "us-east-1"}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 col-span-2 sm:col-span-1">
                      <span className="text-slate-400 block text-[10px]">Access Key</span>
                      <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                        {status?.dynamoDb.hasAccessKey ? "Configured (Present)" : "Missing"}
                      </span>
                    </div>
                  </div>

                  {status?.dynamoDb.errorDetails && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs">
                      {status.dynamoDb.errorDetails}
                    </div>
                  )}
                </div>

                {/* RDS PostgreSQL Section */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                      <Database className="w-4 h-4 text-indigo-600" />
                      <span>AWS RDS / PostgreSQL</span>
                      <span className="text-xs text-slate-400 font-normal">(Alternative)</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {status?.rdsPostgres.status === "connected" ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                        </span>
                      ) : (
                        <span className="text-slate-400">
                          {status?.rdsPostgres.configured ? "Configured" : "Not configured"}
                        </span>
                      )}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    If you prefer PostgreSQL, simply set <code className="font-mono text-blue-600">DATABASE_URL</code> in Vercel. The server auto-creates the <code className="font-mono">coreenact_enquiries</code> table.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "setup" && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  To persist inquiries into AWS when deployed on Vercel, copy these variables into your Vercel Project Settings:
                </p>

                <div className="relative">
                  <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                    {vercelEnvSnippet}
                  </pre>
                  <button
                    onClick={copySnippet}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-slate-700 dark:text-slate-300">
                  <div className="font-bold text-blue-900 dark:text-blue-200 text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>3-Step Vercel Setup</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 leading-relaxed text-xs">
                    <li>Log in to <strong className="text-slate-900 dark:text-slate-100">vercel.com</strong> and open your website project.</li>
                    <li>Go to <strong className="text-slate-900 dark:text-slate-100">Settings</strong> &gt; <strong className="text-slate-900 dark:text-slate-100">Environment Variables</strong>.</li>
                    <li>Paste the <code className="font-mono text-blue-700 dark:text-blue-300">AWS_ACCESS_KEY_ID</code> and <code className="font-mono text-blue-700 dark:text-blue-300">AWS_SECRET_ACCESS_KEY</code> from your AWS IAM console.</li>
                    <li>Click <strong className="text-slate-900 dark:text-slate-100">Redeploy</strong>. Every form submit will instantly persist into AWS DynamoDB.</li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === "records" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Recent Customer Inquiries ({enquiries.length})</span>
                  <button
                    onClick={fetchStatus}
                    className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <RefreshCw className="w-3 h-3" /> Refresh list
                  </button>
                </div>

                {enquiries.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 space-y-2 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                    <Inbox className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="text-sm font-semibold">No inquiries recorded yet</p>
                    <p className="text-xs">Submit the contact form on your website to verify live AWS insertion.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {enquiries.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                          <span>{item.name}</span>
                          <span className="font-mono font-normal text-[10px] text-slate-400">
                            {new Date(item.receivedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-blue-600 dark:text-sky-400 font-medium">
                          {item.email} {item.company && `• ${item.company}`}
                        </div>
                        <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
                          <span>{item.service || "General Consultation"}</span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {item.id}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Notification Target: <strong className="text-slate-700 dark:text-slate-200">coreenacterp@gmail.com</strong>
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-white text-white dark:text-slate-900 font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
