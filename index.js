const mineflayer = require('mineflayer')

function startBot() {
  console.log('Starting PerzaanBot...')
  
  const bot = mineflayer.createBot({
    host: process.env.MC_HOST || 'DreameMc.aternos.me',
    port: parseInt(process.env.MC_PORT || '21530'),
    username: process.env.MC_USERNAME || 'PerzaanBot',
    version: process.env.MC_VERSION || '1.21.4',
    auth: 'offline',
    hideErrors: false
  })

  bot.on('spawn', () => {
    console.log('Bot joined and spawned! SUCCESS')
    bot.chat('PerzaanBot is online!')
    
    // Anti-AFK - har 30 sec me jump karega taaki kick na ho
    setInterval(() => {
      if (bot.entity) {
        bot.setControlState('jump', true)
        setTimeout(() => bot.setControlState('jump', false), 500)
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
    console.log('Bot disconnected, retry in 5s...')
    setTimeout(startBot, 5000)
  })

  bot.on('error', (err) => {
    console.log('Bot error:', err.message)
  })
}

startBot()
  
  
