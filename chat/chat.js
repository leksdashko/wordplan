const UserService = require("../services/user-service");
const Mode = require("./modes/mode");
const ModeEdit = require("./modes/mode-edit");

class Chat {
	constructor(id, bot) {
		this.id = id;
		this.bot = bot;

		this.init();
	}

	async init() {
		const user = await UserService.join(this.id);
		this.user = user;

		this.bot.on('callback_query', async msg => {
			//const chatId = msg.message.chat.id;
			const data = botService.parseInlineData(msg.data);

			if(!data?.action) return false;

			console.log(data);

			if(data.action == Mode.ACTION_EDIT) {
				return await this.setMode(new ModeEdit(this.bot, this));
			}
		});
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