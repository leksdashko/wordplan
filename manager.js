const TelegramBot = require('node-telegram-bot-api');
const routes = require('./routes');
const botService = require('./services/bot-service');
const ChatService = require('./services/chat-service');
const ModeService = require('./services/mode-service');

class BotManager {
	init() {
		const bot = new TelegramBot(process.env.TOKEN, {polling: true});

		bot.on('message', async (msg) => {
			const text = msg.text;
			const chatId = msg.chat.id;

			const chat = await ChatService.createChat(chatId);
			chat.setBot(bot);

			return this.initRoute(chat, text);
		});

		bot.on('callback_query', async msg => {
			const data = botService.parseInlineData(msg.data);

			if(!data?.action) return false;

			const chat = await ChatService.createChat(msg.message.chat.id);
			chat.setBot(bot);

			return this.initRoute(chat, data.action);
		});
	}

	error(chat, message){
		return chat.bot.sendMessage(chat.id, message);
	}

	initRoute(chat, action) {
		try {
			routes.forEach(async (route) => {
				if(route.actions.indexOf(action) !== -1){
					const mode = ModeService.createModeByName(route.mode);

					return await chat.activateMode(mode);
				}
			});
		} catch(e) {
			console.log(e);
			return this.error(chat.bot, chat, 'Something went wrong');
		}
	}
}

module.exports = BotManager;