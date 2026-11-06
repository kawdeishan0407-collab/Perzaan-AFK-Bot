const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot Alive Hai - 24/7'));
app.listen(process.env.PORT || 3000, () => console.log('Web chal raha hai'));

const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: 'DreameMc.aternos.me',
    port: 21530,
    username: 'PerzaanBot',
    version: '1.21.4',
    auth: 'offline'
  })

  bot.on('spawn', () => {
    console.log('Bot JOIN HO GAYA')

    // Har 10 sec me jump + idhar udhar dekhna, taaki Aternos AFK samajh ke kick na kare
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
      bot.look(Math.random() * Math.PI * 2, 0)
      console.log('AFK Jump - Bot Alive')
    }, 10000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    console.log(`${username}: ${message}`)
  })

  bot.on('kicked', (reason) => {
    console.log('Bot kicked:', JSON.stringify(reason))
  })

  bot.on('error', (err) => {
    console.log('Bot error:', err.message)
  })

  // Agar bot disconnect / leave ho jaye to 5 sec me khud wapas aayega
  bot.on('end', () => {
    console.log('Bot disconnected, 5 sec me wapas aa raha hai...')
    setTimeout(startBot, 5000)
  })
}

startBot()
