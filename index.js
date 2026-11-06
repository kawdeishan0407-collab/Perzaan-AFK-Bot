const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is Online'));
app.listen(10000, () => console.log('Web server running'));

function startBot() {
  const bot = mineflayer.createBot({
    host: 'DreameMc.aternos.me',
    port: 21530,
    username: 'PerzaanBot_123',
    auth: 'offline',
    version: '1.21.4',
    keepAlive: true,
    checkTimeoutInterval: 60 * 1000
  });

  bot.on('spawn', () => {
    console.log('Bot JOIN HO GAYA! Game me aa gaya');
  });

  bot.on('kicked', (reason) => {
    console.log('Bot ko KICK kiya: ' + reason);
  });

  bot.on('error', (err) => {
    console.log('Error aaya: ' + err);
  });

  bot.on('end', () => {
    console.log('Bot disconnect hua, 10 sec me dobara try karega');
    setTimeout(startBot, 10000);
  });
}

startBot();
