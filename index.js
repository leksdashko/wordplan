require('dotenv').config();
const sequelize = require('./db');
const bot = require('./controllers/bot-controller');

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
				
				bot.init();
    } catch (e) {
        console.log(e);
    }
}

start();