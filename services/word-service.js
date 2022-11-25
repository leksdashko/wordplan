const WordModel = require('../models/word-model');

class WordService {
	defaultLimit = 10;

	async getList(userId, limit = this.defaultLimit) {
		const list = await WordModel.findAll({where: {userId, isLearned: false}, limit, order: [['id', 'DESC']]});
		return list;
	}

	async add(userId, value, translation) {
		return await WordModel.create({userId, value, translation});
	}
	
	async getAllUserWords() {
		
	}
}

module.exports = WordService;