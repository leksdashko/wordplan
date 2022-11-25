const Mode = require("./mode");

class ModeStop extends Mode {
	async init() {
		await super.init();

		if(this.user?.learningId){
			clearInterval(this.user.learningId);

			this.user.learningId = null;

			return this.user.save();
		}
	}
}

module.exports = ModeStop;