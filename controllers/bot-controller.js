const TelegramBot = require('node-telegram-bot-api');

class BotController {
	bot;

	constructor(token){
		console.log(token);
		this.bot = new TelegramBot(token, {polling: true});
	}

	init() {
		console.log('started');
	}
}

module.exports = new BotController(process.env.TOKEN);