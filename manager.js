const TelegramBot = require('node-telegram-bot-api');
const routes = require('./routes');
const botService = require('./services/bot-service');
const ChatService = require('./services/chat-service');
const UserService = require('./services/user-service');

class BotManager {
	init() {
		const bot = new TelegramBot(process.env.TOKEN, {polling: true});

		bot.on('message', async (msg) => {
			const text = msg.text;
			const chatId = msg.chat.id;

			const chat = await ChatService.createChat(chatId);
			chat.setBot(bot);

			const user = await UserService.join(chat.id);
			chat.setUser(user);

			return this.initRoute(bot, chat, text);
		});

		bot.on('callback_query', async msg => {
			const data = botService.parseInlineData(msg.data);

			if(!data?.action) return false;

			console.log(data);

			const chat = await ChatService.createChat(msg.message.chat.id);
			const user = await UserService.join(chat.id);
			chat.setUser(user);

			return this.initRoute(bot, chat, data.action);
		});
	}

	error(bot, chat, message){
		return bot.sendMessage(chat.id, message);
	}

	initRoute(bot, chat, action) {
		try {
			routes.forEach(async (route) => {
				if(route.actions.indexOf(action) !== -1){
					const modeType = require('./chat/modes/mode-' + route.mode);
					return await chat.setMode(new modeType(bot, chat));
				}
			});
		} catch(e) {
			console.log(e);
			return this.error(bot, chat, 'Something went wrong');
		}
	}
}

module.exports = BotManager;