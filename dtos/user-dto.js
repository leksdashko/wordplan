const UserModel = require("../models/user-model");
const WordModel = require("../models/word-model");
const WordDto = require("./word-dto");

module.exports = class UserDto {
	id;
	learningId;
	addingWordId;
	
	constructor(model) {
		this.id = model.id;
		this.learningId = model.learningId;
		this.addingWordId = model.addingWordId;
	}

	async getAddingWord() {
		if(!this.addingWordId) return;

		const word = await WordModel.findOne({where: {id: this.addingWordId}});
		if(!word) return;

		const wordDto = new WordDto(word);

		return wordDto;
	}

	async setAddingWord(word) {
		let value = null;
		if(word){
			const model = await WordModel.findOne({where: {id: word.id}});
			if(model && !model?.translation){
				value = word.id;
			}
		}

		this.addingWordId = value;

		return await this.save();
	}

	async save() {
		const model = await UserModel.findOne({where: {id: this.id}});
		if(!model) return;

		model.addingWordId = this.addingWordId;

		return await model.save();
	}
}