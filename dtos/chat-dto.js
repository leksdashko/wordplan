module.exports = class ChatDto {
	constructor(model) {
		this.id = model.id;
		this.chatId = model.chatId;
	}

	setUser(user) {
		this.user = user;
	}

	setBot(bot) {
		this.bot = bot;
	}

	async setMode(mode) {
		if(this.mode){
			await this.mode.stop();
		}

		await mode.init();

		this.mode = mode;
	}
}