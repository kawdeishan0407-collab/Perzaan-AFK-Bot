const express = require('express');
const app = express();
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
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
      bot.look(Math.random() * Math.PI * 2, 0)
      console.log('AFK Jump')
    }, 30000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    console.log(`${username}: ${message}`)
  })

  bot.on('kicked', (reason) => {
    console.log('Bot kicked:', JSON.stringify(reason))
  })

  bot.on('end', () => {
    console.log('Bot disconnected, retry in 5 sec...')
    setTimeout(startBot, 5000)
  })

  bot.on('error', (err) => {
    console.log('Bot error:', err.message)
  })
}

startBot()
