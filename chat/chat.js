class Chat {
	constructor(id, bot) {
		this.id = id;
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

module.exports = Chat;