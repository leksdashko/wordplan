const WordDto = require('../dtos/word-dto');
const WordModel = require('../models/word-model');

class WordService {
	static async getList(userId, limit = 2) {
		const list = await WordModel.findAll({where: {userId, isLearned: false}, limit, order: [['id', 'DESC']]});
		return list;
	}

	static async add(userId, value, translation = null) {
		let word = await WordModel.findOne({where: {userId, translation: null, isLearned: false}});
		if(!word){
			word = await WordModel.create({userId, value, translation});
		}

		const wordDto = new WordDto(word);
		return wordDto;
	}
	
	async getAllUserWords() {
		
	}
}

module.exports = WordService;