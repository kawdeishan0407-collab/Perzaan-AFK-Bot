const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: 'APNE-SERVER-KA-IP-YAHA-DALO',
    port: 25565,
    username: 'PerzaanBot',
    version: '1.20.1',
    auth: 'offline'
  })

  bot.on('spawn', () => {
    console.log('Bot joined and spawned! SUCCESS')
    bot.chat('PerzaanBot is online!')
    
    setInterval(() => {
      if (bot.entity) {
        bot.setControlState('jump', true)
        setTimeout(() => bot.setControlState('jump', false), 500)
        bot.look(Math.random() * Math.PI * 2, 0)
        console.log('AFK Jump kiya')
      }
    }, 30000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    console.log(`${username}: ${message}`)
  })

  bot.on('kicked', (reason) => {
    console.log('Bot kicked:', reason)
  })

  bot.on('end', () => {
    console.log('Bot disconnected, retry in 5s')
    setTimeout(startBot, 5000)
  })

  bot.on('error', (err) => {
    console.log('Bot error:', err.message)
  })
}

startBot()
