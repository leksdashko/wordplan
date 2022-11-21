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
		botService.initBot(this.bot);
		
		this.bot.setMyCommands(botService.createBasicMenu());

		this.bot.on('message', async (msg) => {
			const text = msg.text;
			const chatId = msg.chat.id;
			const userName = msg.from?.username;

			const user = await userService.join(chatId, userName);

			try {
				if(botService.isStart(text)){
					return botService.start(chatId);
				}

				if(botService.isLearning(text)){
					const vocabulary = await wordService.getList(user.id);

					return botService.learning(chatId, vocabulary);
				}

				if(botService.isStop(text)){
					return botService.stop(chatId);
				}

				if(botService.isAdd(text)){

				}
			} catch(e) {
				console.log(e);
				botService.stop(chatId);
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