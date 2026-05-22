import { Telegraf } from 'telegraf'

// Создаём экземпляр бота
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!)

// Команда /start
bot.start((ctx) => {
  ctx.reply(
    'Привет! Я бот проекта.\n\n' +
    'Доступные команды:\n' +
    '/start - начало работы\n' +
    '/help - помощь\n' +
    '/status - статус сервиса'
  )
})

// Команда /help
bot.help((ctx) => {
  ctx.reply(
    'Помощь:\n\n' +
    '/status - проверить статус сервиса\n' +
    'По всем вопросам обращайтесь к администратору'
  )
})

// Команда /status
bot.command('status', (ctx) => {
  ctx.reply('Сервис работает нормально')
})

// Обработка обычных сообщений
bot.on('text', (ctx) => {
  ctx.reply('Используй команды для работы с ботом. Напиши /help для справки.')
})

export default bot