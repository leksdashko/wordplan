const WordModel = require('../models/word-model');
const WordDto = require('../dtos/word-dto');
const BotError = require('../exceptions/bot-error');

class WordService {
	defaultLimit = 10;

	async getList(userId, limit = this.defaultLimit) {
		return await WordModel.findAll({userId, isLearned: false, limit});
	}

	async add(value) {
			
	}
	
	async getAllUserWords() {
		
	}
}

module.exports = new WordService();