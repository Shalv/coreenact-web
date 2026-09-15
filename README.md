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

## Form Inquiries & Database Storage

Customer form submissions on your website (`/api/enquiry`) are handled with flexible storage:

- **In-Memory Storage (Default / Zero Config)**: Works out of the box with zero external configuration required.
- **PostgreSQL Database (Optional)**: If you provide a standard `DATABASE_URL` or `POSTGRES_URL` connection string in your environment variables, submissions are automatically persisted to a SQL table.

### Checking Inquiries & Database Health
- Access `GET /api/db-status` to verify database connectivity status in real time.
- Access `GET /api/enquiries` to view recent form submissions.

