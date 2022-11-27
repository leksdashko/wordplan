const Mode = require("./mode");

class ModeEdit extends Mode {
	ACTION_UPDATE = 'Update';

	buttons = [{text: this.ACTION_CANCEL}];

	async init(){
		await super.init();

		this.bot.on('callback_query', async msg => {
			//const chatId = msg.message.chat.id;
			const data = botService.parseInlineData(msg.data);

			if(!data?.action) return false;

			console.log(data);

			// if(data.action == this.ACTION_EDIT) {
			// 	return await this.chat.setMode(new ModeEdit(this.bot, this.chat));
			// }
		});
	}
}

module.exports = ModeEdit;