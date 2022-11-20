const TelegramBot = require('node-telegram-bot-api');
const userService = require('./services/user-service');
const botService = require('./services/bot-service');

class BotManager {
	bot;

	constructor(){
		this.bot = new TelegramBot(process.env.TOKEN, {polling: true});
	}

	init() {
		this.bot.on('message', async (msg) => {
			const text = msg.text;
			const chatId = msg.chat.id.toString();
			const userName = msg.from?.username;

			try {
				if(botService.isStart(text)){
					const user = await userService.join(chatId, userName);

					console.log(user);
				}

				if(botService.isStop(text)){

				}

				if(botService.isAdd(text)){

				}
			} catch(e) {
				console.log(e);
				return this.error(chatId, 'Something went wrong');
			}
		});
	}

	error(chatId, message){
		return this.bot.sendMessage(chatId, message);
	}
}

module.exports = new BotManager();