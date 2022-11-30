const TelegramBot = require('node-telegram-bot-api');
const { ModeAdd, ModeStop } = require('./modes');
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

			return await this.initRoute(chat, text);
		});

		bot.on('callback_query', async msg => {
			const data = botService.parseInlineData(msg.data);

			if(!data?.action) return false;

			const chat = await ChatService.createChat(msg.message.chat.id);
			chat.setBot(bot);

			return await this.initRoute(chat, data.action);
		});
	}

	error(chat, message){
		console.log(chat);
		return chat.bot.sendMessage(chat.chatId, message);
	}

	async initRoute(chat, action) {
		try {
			const currentMode = chat.mode;
			const isAdd = currentMode instanceof ModeAdd;

			let mode;

			routes.forEach(async (route) => {
				if(route.actions.indexOf(action) !== -1){
					mode = ModeService.createModeByName(route.mode);
				}
			});

			if(!mode) return;

			const isStop = mode instanceof ModeStop;

			console.log(isStop);

			if(isAdd && !isStop){
				return await chat.sendData(action);
			}

			return await chat.activateMode(mode);

		} catch(e) {
			console.log(e);
			return this.error(chat, 'Something went wrong');
		}
	}
}

module.exports = BotManager;