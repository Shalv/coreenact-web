<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/dd232b5e-ba95-4382-ada5-7367217e56d3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Connecting Vercel with AWS Database (Forms & Inquiries)

Since Vercel is a serverless frontend/API host without an integrated persistent database, customer form submissions on your website (`/api/enquiry`) connect to an **AWS Database**:

### Recommended: AWS DynamoDB (Serverless & Free Tier)
AWS DynamoDB is the industry-standard choice for Vercel serverless apps because it uses HTTPS API calls (no open TCP connection pool exhaustion), scales automatically, and includes **25 GB permanent free storage**.

#### Step 1: Create an IAM User on AWS
1. Open the [AWS Management Console](https://aws.amazon.com/console/) and go to **IAM** > **Users** > **Create user**.
2. Name it (e.g., `vercel-coreenact-forms`).
3. Attach policy directly: `AmazonDynamoDBFullAccess` (or a custom policy scoped to `coreenact_enquiries` table).
4. Under **Security credentials**, click **Create access key** (choose "Application running outside AWS").
5. Copy the **Access Key ID** and **Secret Access Key**.

#### Step 2: (Optional) Create the DynamoDB Table
- The app automatically provisions the table if it does not exist.
- If you prefer manual setup:
  - Table name: `coreenact_enquiries`
  - Partition key: `id` (Type: String)
  - Capacity mode: **On-demand (Pay per request)**

#### Step 3: Add Variables in Vercel
1. In your **Vercel Dashboard**, go to your project > **Settings** > **Environment Variables**.
2. Add the following:
   - `AWS_REGION`: your AWS region (e.g. `us-east-1` or `ap-south-1`)
   - `AWS_ACCESS_KEY_ID`: your AWS IAM access key
   - `AWS_SECRET_ACCESS_KEY`: your AWS IAM secret key
   - `AWS_DYNAMODB_TABLE`: `coreenact_enquiries` (optional, defaults to `coreenact_enquiries`)
   - `NOTIFICATION_EMAIL`: `coreenacterp@gmail.com`
3. Click **Redeploy** on Vercel.

---

### Alternative: AWS RDS (PostgreSQL / Aurora)
If you prefer a relational SQL database:
1. Create a PostgreSQL instance in AWS RDS.
2. In Vercel Environment Variables, set:
   - `DATABASE_URL`: `postgres://username:password@your-rds-host.rds.amazonaws.com:5432/dbname`
   - `DB_SSL`: `true`
3. The server will automatically create the `coreenact_enquiries` SQL table and store all form submissions.

### Checking Database Health
- Access `GET /api/db-status` on your deployed Vercel domain to verify database connectivity status in real time.
- Access `GET /api/enquiries` to view recent form submissions stored in your AWS database.

