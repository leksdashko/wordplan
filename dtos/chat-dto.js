const ChatModel = require("../models/chat-model");
const UserModel = require("../models/user-model");
const UserDto = require("./user-dto");

module.exports = class ChatDto {
	id;
	chatId;
	user;
	mode;

	constructor(model) {
		this.id = model.id;
		this.chatId = model.chatId;
		this.model = model;
	}

	async build() {
		if(this.model?.userId){
			const user = await UserModel.findOne({where: {id:this.model.userId}});
			if(user) {
				const userDto = new UserDto(user);
				await this.setUser(userDto);
			}
		}else{
			const user = await UserModel.create();
			const userDto = new UserDto(user);
			await this.setUser(userDto);
		}

		if(this.model?.modeId){
			const mode = ModeService.createModeById(this.model.modeId);
			mode.setChat(this);

			this.setMode(mode);
		}
	}

	async setUser(user) {
		this.user = user;

		return await this.save();
	}

	async setMode(mode) {
		this.mode = mode;

		return await this.save();
	}

	async activateMode(mode) {
		if(this.mode){
			await this.mode.stop();
		}

		mode.setChat(this);

		await mode.init();

		// return await this.setMode(mode);
	}

	async save() {
		const model = await ChatModel.findOne({where: {id: this.id}});
		if(!model) return;

		if(this.user) model.userId = this.user.id;
		if(this.mode) model.modeId = this.mode.ID;

		return await model.save();
	}
}