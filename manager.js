const TelegramBot = require('node-telegram-bot-api');
const userService = require('./services/user-service');
const wordService = require('./services/word-service');
const botService = require('./services/bot-service');

class BotManager {
	bot;

	constructor(){
		this.bot = new TelegramBot(process.env.TOKEN, {polling: true});
	}

	init() {
		this.bot.setMyCommands(botService.createBasicMenu());

		this.bot.on('message', async (msg) => {
			const text = msg.text;
			const chatId = msg.chat.id.toString();
			const userName = msg.from?.username;

			try {
				if(botService.isStart(text)){
					const user = await userService.join(chatId, userName);
					
					await this.bot.sendMessage(chatId, 'Hello ' + userName + '!', botService.createClassicMenu());

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

		this.bot.on('callback_query', msg => {
			const data = botService.parseInlineData(msg.data);
			const chat = msg.message.chat.id;
			
			if(data.action === botService.MESSAGE_SKIP){
				//return skip(data.id);
			}
		});
	}

	error(chatId, message){
		return this.bot.sendMessage(chatId, message);
	}
}

module.exports = new BotManager();