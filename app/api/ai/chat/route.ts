import { generateText } from 'ai'
import { model } from '@/shared/lib/ai'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await generateText({
    model,
    system: 'Ты полезный AI ассистент. Отвечай на русском языке.',
    messages,
  })

  return new Response(result.text)
}