require('dotenv').config();
require('./models');
const sequelize = require('./db');
const BotManager = require('./manager');

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (e) {
        console.log(e);
    }

		const bot = new BotManager();
		bot.init();
}

start();