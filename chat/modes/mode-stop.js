const UserService = require("../../services/user-service");
const Mode = require("./mode");

class ModeStop extends Mode {
	async init() {
		await super.init();

		const user = await UserService.getById(this.user.id);

		if(user.learningId){
			clearInterval(user.learningId);

			return await UserService.clearLearningProcess(user);
		}
	}
}

module.exports = ModeStop;