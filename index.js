const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is Online'));
app.listen(process.env.PORT || 10000, () => console.log('Web server running'));

let bot;
let afkInterval;

function startBot() {
  bot = mineflayer.createBot({
    host: 'DreameMc.aternos.me',
    port: 21530,
    username: 'Perzaan-Bot',
    auth: 'offline',
    version: '1.21.4',
    keepAlive: true
  });

  bot.on('spawn', () => {
    console.log('Bot JOIN HO GAYA!');
    // Har 20 sec me hilega, jump karega - AFK kick nahi aayega
    clearInterval(afkInterval);
    afkInterval = setInterval(() => {
      try {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
        bot.swingArm('right');
        bot.look(Math.random() * Math.PI * 2, 0, true);
        console.log('AFK se bachne ke liye hila');
      } catch (e) {}
    }, 20000);
  });

  bot.on('kicked', (reason) => {
    console.log('KICK hua: ' + reason + ' | 10 sec me wapas join karega');
    clearInterval(afkInterval);
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Error: ' + err);
  });

  bot.on('end', () => {
    console.log('Disconnect hua, 10 sec me wapas');
    clearInterval(afkInterval);
    setTimeout(startBot, 10000);
  });
}

startBot();
