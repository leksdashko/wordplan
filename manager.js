const TelegramBot = require('node-telegram-bot-api');
const Chat = require('./chat/chat');
const routes = require('./routes');

class BotManager {
	init() {
		const bot = new TelegramBot(process.env.TOKEN, {polling: true});

		bot.on('message', async (msg) => {
			const text = msg.text;
			const chatId = msg.chat.id;

			const chat = new Chat(chatId, bot);

			try {
				routes.forEach((route) => {
					if(route.actions.indexOf(text) !== -1){
						const modeType = require('./chat/modes/mode-' + route.mode);
						return chat.setMode(new modeType(bot, chatId));
					}
				});
			} catch(e) {
				console.log(e);
				return this.error(bot, chatId, 'Something went wrong');
			}
		});

		bot.on('callback_query', msg => {
			const data = botService.parseInlineData(msg.data);

			const chat = new Chat(msg.message.chat.id, bot);
			
			routes.forEach((route) => {
				if(route.actions.indexOf(text) !== -1){
					const modeType = require('./chat/modes/mode-' + route.mode);
					return chat.setMode(new modeType(bot, chatId));
				}
			});
		});
	}

	error(bot, chatId, message){
		return bot.sendMessage(chatId, message);
	}
}

module.exports = BotManager;