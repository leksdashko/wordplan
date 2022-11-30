const WordModel = require("../models/word-model");

module.exports = class WordDto {
	constructor(model) {
		this.id = model.id;
		this.value = model.value;
		this.translation = model.translation;
	}

	setTranslation(translation) {
		this.translation = translation;
	}

	async save() {
		const model = await WordModel.findOne({where: {id: this.id}});
		if(!model) return;

		model.translation = this.translation;

		return await model.save();
	}
}