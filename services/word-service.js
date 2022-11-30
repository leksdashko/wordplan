const WordDto = require('../dtos/word-dto');
const WordModel = require('../models/word-model');

class WordService {
	defaultLimit = 10;

	static async getList(userId, limit = this.defaultLimit) {
		const list = await WordModel.findAll({where: {userId, isLearned: false}, limit, order: [['id', 'DESC']]});
		return list;
	}

	static async add(userId, value, translation = null) {
		const word = await WordModel.create({userId, value, translation});
		const wordDto = new WordDto(word);

		return wordDto;
	}
	
	async getAllUserWords() {
		
	}
}

module.exports = WordService;