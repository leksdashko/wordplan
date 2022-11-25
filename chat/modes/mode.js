const UserService = require("../../services/user-service");

class Mode {
	ACTION_STOP     = 'Stop';
	ACTION_LEARNING = 'Learning';
	ACTION_ADD      = 'Add new';

	buttons = [{text: this.ACTION_LEARNING}, {text: this.ACTION_ADD}];
	defaultButtons = [{text: this.ACTION_LEARNING}, {text: this.ACTION_ADD}];

	startMessage    = 'Choose your option:';

	constructor(bot, chatId) {
		this.bot = bot;
		this.chatId = chatId;
	}

	async init() {
		const user = await UserService.join(this.chatId);

		this.user = user;

		return this.initKeyboard();
	}

	initKeyboard(){
		return this.bot.sendMessage(this.chatId, this.startMessage, {
			reply_markup: {
				keyboard: [this.buttons], 
				resize_keyboard: true
			}
		});
	}

	initDefaultKeyboard(){
		return this.bot.sendMessage(this.chatId, 'Choose your option:', {
			reply_markup: {
				keyboard: [this.defaultButtons], 
				resize_keyboard: true
			}
		});
	}

	clear(){
		return this.initDefaultKeyboard();
	}
}

module.exports = Mode;