# AGENTS.md - Инструкции для AI-агентов (Cursor, Copilot, Claude)

## Что это за проект
Production-ready starter kit для SaaS, AI apps и веб-платформ.
Российский рынок. Без Stripe, без иностранных платежей.

## Технический стек (точные версии)
- Next.js 15, React 19, TypeScript 5
- Tailwind CSS 3, shadcn/ui (Radix + Nova), Framer Motion
- Zustand, TanStack Query v5, React Hook Form + Zod
- Prisma 5.22.0 + PostgreSQL 17
- AI: Groq llama-3.3-70b-versatile через ai SDK v6
- Auth: JWT через jose + bcryptjs (без NextAuth)

## Структура проекта
app/
  api/auth/        — register, login, logout
  api/ai/chat/     — AI стриминг через Groq
  dashboard/       — защищённая страница
  login/           — страница входа
  register/        — страница регистрации
  ai-chat/         — AI чат страница
  providers.tsx    — QueryClient + AuthProvider
  layout.tsx       — корневой layout
features/
  auth/            — UI компоненты авторизации
  ai-chat/         — UI компоненты AI чата
shared/
  lib/prisma.ts    — singleton Prisma клиент
  lib/ai.ts        — Groq AI клиент
store/
  auth.ts          — Zustand стор авторизации
hooks/
  useAuth.ts       — хук для работы с авторизацией
middleware.ts      — защита роутов (проверка JWT)

## База данных
Модели: User (id, email, name, password, role, createdAt, updatedAt)
        Session (id, userId, token, expiresAt, createdAt)
Роли: USER | ADMIN | MODERATOR

## Правила генерации кода

### Обязательно
- TypeScript везде, никогда any
- Zod схема для каждого API endpoint
- try/catch для всех async операций
- Проверка авторизации в каждом защищённом API роуте
- "use client" только при использовании хуков или событий

### Запрещено
- Не добавляй новые npm пакеты без явного запроса
- Не изменяй схему Prisma без явного запроса
- Не меняй структуру папок
- Не используй any, unknown без крайней необходимости
- Не делай inline стили — только Tailwind классы
- Не коммить секреты — всё в .env

### Стиль кода
- Компоненты: PascalCase (UserCard.tsx)
- Хуки: use + camelCase (useAuth.ts)
- Сторы: camelCase + Store (authStore.ts)
- Папки: kebab-case (user-profile/)
- Комментарии на русском языке

## Паттерны которые уже используются

### API роут (пример)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = SomeZodSchema.parse(body)
    // логика
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Ошибка' }, { status: 400 })
  }
}

### Проверка авторизации в API
const token = req.cookies.get('token')?.value
if (!token) return Response.json({ error: 'Не авторизован' }, { status: 401 })

### Zustand стор
import { create } from 'zustand'
interface State { user: User | null }
export const useStore = create<State>(() => ({ user: null }))

## Переменные окружения
DATABASE_URL     — строка подключения PostgreSQL
JWT_SECRET       — секрет для подписи токенов (мин. 32 символа)
GROQ_API_KEY     — ключ Groq API

## Приоритеты при разработке
1. Безопасность
2. Читаемость кода
3. Переиспользуемость
4. Производительность