# Coreenact Website

React + Vite + TypeScript website with an Express API layer for Coreenact's enterprise AI features.

## Local development

```bash
npm install
npm run dev
```

Open the local URL shown by Vite/Express.

## Production deployment

This repository is structured for **GitHub → Vercel** deployment.

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Add `GEMINI_API_KEY` under Vercel Project Settings → Environment Variables.
4. Deploy.

The React/Vite frontend is built into `dist/`. Requests under `/api/*` are routed to the Express API function in `api/index.ts`.

## Environment variables

See `.env.example`. Never commit `.env` or a real Gemini API key.
