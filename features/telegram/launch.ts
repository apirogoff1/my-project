import { config } from 'dotenv'
config()

import bot from './bot'

console.log('Telegram бот запускается...')

bot.launch()
  .then(() => {
    console.log('Бот запущен успешно!')
  })
  .catch((error: unknown) => {
    console.error('Ошибка запуска бота:', error)
    process.exit(1)
  })

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))