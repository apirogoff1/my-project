'use client'

import { useAuth } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Дашборд</h1>
          <button
            onClick={() => {
              logout()
              router.push('/login')
            }}
            className="bg-red-500 text-white rounded px-4 py-2 text-sm font-medium hover:bg-red-600"
          >
            Выйти
          </button>
        </div>
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Добро пожаловать!</h2>
          <div className="flex flex-col gap-2 text-sm">
            <p><span className="font-medium">Имя:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Роль:</span> {user.role}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
