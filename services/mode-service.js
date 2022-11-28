const ModeModel = require('../models/mode-model');
const modes = require('../modes');

class ModeService {
	static async createModeById(id) {
		const mode = await ModeModel.findOne({where: {id}});
		if(!mode) return;

		return this.createModeByName(mode.name);
	}

	static createModeByName(name) {
		const modeType = 'Mode' + name;
		const mode = modes[modeType];
		return new mode();
	}
}

module.exports = ModeService;