const TelegramBot = require('node-telegram-bot-api');
const userService = require('./services/user-service');
const UserService = require('./services/user-service');

class BotManager {
	ACTION_START = '/start';
	ACTION_STOP  = '/stop';
	ACTION_ADD   = '/add';

	MESSAGE_START    = 'Start';
	MESSAGE_STOP     = 'Stop';
	MESSAGE_ADD_NEW  = 'Add new';
	MESSAGE_LEARNING = 'Learning';
	MESSAGE_PRACTICE = 'Practice';

	MESSAGE_SKIP      = 'Skip';
	MESSAGE_TRANSLATE = 'Translate';

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
				if(this.isStart(text)){
					const user = await userService.join(chatId, userName);

					console.log(user);
				}

				if(this.isStop(text)){

				}

				if(this.isAdd(text)){

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

	isStart(action){
		if(action === this.ACTION_START || action === this.MESSAGE_START) return true;

		return false;
	}

	isStop(action){
		if(action === this.ACTION_STOP || action === this.MESSAGE_STOP) return true;

		return false;
	}

	isAdd(action){
		if(action === this.ACTION_ADD || action === this.MESSAGE_ADD_NEW) return true;

		return false;
	}
}

module.exports = new BotManager();