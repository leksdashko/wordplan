require('dotenv').config();
require('./models');
const sequelize = require('./db');
const bot = require('./manager');

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (e) {
        console.log(e);
    }

		bot.init();
}

start();