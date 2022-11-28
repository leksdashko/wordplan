const UserService = require("../services/user-service");

class Chat {
	constructor(id, bot) {
		this.id = id;
		this.bot = bot;

		this.init();
	}

	async init() {
		const user = await UserService.join(this.id);
		this.user = user;
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