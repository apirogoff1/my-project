import { NextRequest } from 'next/server'
import bot from '@/features/telegram/bot'

// Этот роут принимает сообщения от Telegram
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await bot.handleUpdate(body)
    return Response.json({ ok: true })
  } catch (error) {
    console.error('Ошибка Telegram вебхука:', error)
    return Response.json({ error: 'Ошибка' }, { status: 500 })
  }
}