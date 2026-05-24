# AGENTS.md - Guide for AI agents working on this project

## Project overview
Production-ready AI-first starter kit for Russian market.
Built with Next.js 15, React 19, TypeScript 5.

## Before making any changes
1. Read .cursorrules for all rules
2. Check existing components before creating new ones
3. Never install new packages without asking
4. Never change Prisma schema without asking

## Project structure
- app/                    — Next.js pages and API routes
- app/api/                — API endpoints
- app/api/auth/           — Auth endpoints (register, login, logout, telegram)
- app/api/ai/chat/        — AI chat endpoint (Groq)
- app/api/webhooks/       — Webhook handlers
- app/api/subscribe/      — Email subscription
- features/auth/          — Auth UI components and logic
- features/ai-chat/       — AI chat UI
- features/telegram/      — Telegram bot and login
- features/yookassa/      — YooKassa payment integration
- shared/lib/             — Utilities (ai.ts, n8n.ts)
- components/ui/          — shadcn/ui components
- components/analytics/   — Analytics (YandexMetrika)
- shared/ui-kit/          — Custom UI kit components
- store/                  — Zustand global state
- hooks/                  — Custom React hooks
- prisma/                 — Database schema and migrations

## Key files
- app/layout.tsx          — Root layout with providers and analytics
- app/page.tsx            — Landing page
- app/dashboard/page.tsx  — Dashboard (protected)
- app/ai-chat/page.tsx    — AI chat (protected)
- middleware.ts           — Auth middleware (protects /dashboard, /ai-chat)
- prisma/schema.prisma    — Database schema (User, Session)
- .env                    — Environment variables (never commit)

## Environment variables required
- DATABASE_URL
- JWT_SECRET
- GROQ_API_KEY
- TELEGRAM_BOT_TOKEN
- NEXT_PUBLIC_APP_URL
- NEXT_PUBLIC_TELEGRAM_BOT_NAME
- RESEND_API_KEY
- YOOKASSA_SHOP_ID
- YOOKASSA_SECRET_KEY
- N8N_WEBHOOK_URL

## How to run locally
1. npm install
2. Copy .env.example to .env and fill in values
3. npx prisma migrate dev
4. npm run dev

## How to run with Docker
1. docker-compose up --build

## Code style
- TypeScript strict mode
- Zod validation for all API inputs
- try/catch for all async operations
- Tailwind CSS for all styles
- No inline styles
