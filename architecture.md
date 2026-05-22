# Architecture.md - Архитектура проекта

## Что это за проект
Production-ready starter kit для SaaS, AI apps и веб-платформ.
Российский рынок. Windows-разработка. Без иностранных платёжных систем.

## Стек (точные версии)
- Next.js 15 (App Router), React 19, TypeScript 5
- Tailwind CSS 3, shadcn/ui (Radix + Nova), Framer Motion
- Zustand, TanStack Query v5, React Hook Form + Zod
- Prisma 5.22.0 + PostgreSQL 17
- AI: Groq llama-3.3-70b-versatile, ai SDK v6
- Auth: JWT (jose + bcryptjs) — без NextAuth

## Структура папок

my-project/
  app/                        — страницы и API роуты (Next.js App Router)
    api/
      auth/
        register/route.ts     — POST /api/auth/register
        login/route.ts        — POST /api/auth/login
        logout/route.ts       — POST /api/auth/logout
      ai/
        chat/route.ts         — POST /api/ai/chat (стриминг Groq)
    dashboard/page.tsx        — защищённая страница (только для авторизованных)
    login/page.tsx            — страница входа
    register/page.tsx         — страница регистрации
    ai-chat/page.tsx          — страница AI чата
    providers.tsx             — QueryClient + AuthProvider
    layout.tsx                — корневой layout
    globals.css               — глобальные стили
    page.tsx                  — главная страница

  features/                   — законченные фичи продукта
    auth/                     — всё что связано с авторизацией
      ui/                     — UI компоненты фичи
    ai-chat/                  — AI чат
      ui/
        AiChat.tsx            — компонент чата

  shared/                     — переиспользуемый код
    lib/
      prisma.ts               — singleton Prisma клиент
      ai.ts                   — Groq AI клиент

  store/
    auth.ts                   — Zustand стор (user, isLoading, login, logout)

  hooks/
    useAuth.ts                — хук авторизации (читает store + проверяет сессию)

  middleware.ts               — защита роутов через JWT проверку

## База данных

### Модель User
- id: String (cuid)
- email: String (unique)
- name: String (optional)
- password: String (bcrypt hash)
- role: Enum (USER | ADMIN | MODERATOR)
- createdAt, updatedAt: DateTime

### Модель Session
- id: String (cuid)
- userId: String (FK -> User)
- token: String (unique, JWT)
- expiresAt: DateTime
- createdAt: DateTime

## Авторизация — как работает

1. Пользователь заполняет форму регистрации/входа
2. POST запрос на /api/auth/register или /api/auth/login
3. Сервер валидирует данные через Zod
4. Пароль хешируется через bcryptjs
5. Создаётся JWT токен через jose
6. Токен сохраняется в Session таблице
7. Токен записывается в httpOnly cookie
8. middleware.ts проверяет cookie на каждом запросе
9. Если токен невалидный — редирект на /login

## AI чат — как работает

1. Пользователь пишет сообщение в AiChat.tsx
2. POST запрос на /api/ai/chat
3. Сервер отправляет запрос в Groq API
4. Ответ стримится обратно чанками
5. useChat хук из ai SDK обновляет UI в реальном времени

## Поток данных

Пользователь -> UI компонент -> API роут -> Zod валидация
-> Prisma (БД) -> Response -> TanStack Query кеш -> UI обновление

## Защита роутов (middleware.ts)

Защищённые роуты: /dashboard, /profile, /admin, /ai-chat
Публичные роуты: /, /login, /register, /api/auth/*
Логика: проверка JWT из cookie -> редирект если невалидный

## Переменные окружения

DATABASE_URL    — postgresql://user:pass@localhost:5432/myproject
JWT_SECRET      — секрет минимум 32 символа
GROQ_API_KEY    — ключ от console.groq.com

## Дорожная карта

Этапы 1-9   ЗАВЕРШЕНЫ (стек, auth, AI, документация)
Этап 10  — Telegram бот + Telegram Login + ЮКасса + вебхуки + n8n
Этап 11  — Docker + VPS + CI/CD + безопасность + мониторинг
Этап 12  — UI Kit: компоненты для SaaS и лендингов