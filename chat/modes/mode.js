const UserService = require("../../services/user-service");

class Mode {
	ACTION_STOP     = 'Stop';
	ACTION_CANCEL   = 'Cancel';
	ACTION_LEARNING = 'Learning';
	ACTION_ADD      = 'Add new';
	ACTION_EDIT     = 'Edit';

	buttons = [{text: this.ACTION_LEARNING}, {text: this.ACTION_ADD}];
	defaultButtons = [{text: this.ACTION_LEARNING}, {text: this.ACTION_ADD}];

	startMessage    = 'Choose your option:';

	constructor(bot, chat) {
		this.bot = bot;
		this.chat = chat;
	}

	async init() {
		const user = await UserService.join(this.chat.id);

		this.user = user;

		return this.initKeyboard();
	}

	initKeyboard(){
		return this.bot.sendMessage(this.chat.id, this.startMessage, {
			reply_markup: {
				keyboard: [this.buttons], 
				resize_keyboard: true
			}
		});
	}

	initDefaultKeyboard(){
		return this.bot.sendMessage(this.chat.id, 'Choose your option:', {
			reply_markup: {
				keyboard: [this.defaultButtons], 
				resize_keyboard: true
			}
		});
	}

	createInlineKeyboard(buttons){
		return {
			reply_markup: JSON.stringify({
				inline_keyboard: [buttons]
			})
		}
	};

	stop(){
		return this.initDefaultKeyboard();
	}
}

module.exports = Mode;