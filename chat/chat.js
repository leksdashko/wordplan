class Chat {
	constructor(id, bot) {
		this.id = id;
		this.bot = bot;
	}

	async setMode(mode) {
		await mode.init()
	}
}

module.exports = Chat;