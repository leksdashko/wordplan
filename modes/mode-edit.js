const botService = require("../services/bot-service");
const Mode = require("./mode");

class ModeEdit extends Mode {
	ID = 3;
	buttons = [{text: this.ACTION_CANCEL}];

	async init(){
		await super.init();

		this.bot.sendMessage(this.chat.chatId, 'Err - err', this.createInlineKeyboard([
			{text: this.ACTION_UPDATE, callback_data: botService.createInlineData(this.ACTION_UPDATE, 123)}
		]));

		
	}
}

module.exports = ModeEdit;