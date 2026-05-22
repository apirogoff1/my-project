import { AiChat } from '@/features/ai-chat'

export default function AiChatPage() {
  return (
    <main className='min-h-screen bg-gray-950 py-8 px-4'>
      <h1 className='text-white text-2xl font-bold text-center mb-6'>AI Чат</h1>
      <AiChat />
    </main>
  )
}