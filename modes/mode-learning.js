const botService = require("../services/bot-service");
const UserService = require("../services/user-service");
const WordService = require("../services/word-service");
const { createArrayOfNumbers, shuffleArray } = require("../utils");
const Mode = require("./mode");

class ModeLearning extends Mode {
	ID = 2;
	interval = 5000;
	expiredIn = 15000; // sign - знак though - хотя through -
	// interval = 30000;
	// expiredIn = 500 * 60 * 60 * 1; // one hour

	buttons = [{text: this.ACTION_STOP}];
	startMessage = 'Learning process has started';

	async init(){
		await super.init();
		await this.start();
	}

	async start(){
		const vocabulary = await WordService.getList(this.chat.user.id);

		const count = vocabulary.length;
		if(!count){
			await this.chat.bot.sendMessage(this.chat.chatId, 'Please add new words to your vocabulary:');
			return this.stop();
		}

		let notShowed = shuffleArray(createArrayOfNumbers(count));

		const wordsList = vocabulary.map(word => {
			return word.value + ' - ' + word.translation;
		});

		await this.chat.bot.sendMessage(this.chat.chatId, wordsList.join(' \n'));

		const processId = setInterval(() => {
			const index = notShowed.shift();
			const word = vocabulary[index];

			if(notShowed.length < 1){
				notShowed = createArrayOfNumbers(count);
			}

			this.chat.bot.sendMessage(this.chat.chatId, word.translation + ' - ' + processId, this.createInlineKeyboard([
				{text: word.value, callback_data: botService.createInlineData(this.ACTION_TRANSLATE, word.id)},
				{text: this.ACTION_SKIP, callback_data: botService.createInlineData(this.ACTION_SKIP, word.id)},
				{text: this.ACTION_EDIT, callback_data: botService.createInlineData(this.ACTION_EDIT, word.id)}
			]));
		}, this.interval);

		setTimeout(() => {
			this.stop();
		}, this.expiredIn);

		return await UserService.setLearningProcess(this.chat.user.id, processId);
	}

	async stop() {
		const user = await UserService.getById(this.chat.user.id);

		this.initDefaultKeyboard();

		return await UserService.clearLearningProcess(user);
	}
}

module.exports = ModeLearning;