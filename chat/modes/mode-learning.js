const botService = require("../../services/bot-service");
const UserService = require("../../services/user-service");
const WordService = require("../../services/word-service");
const { createArrayOfNumbers, shuffleArray } = require("../../utils");
const Mode = require("./mode");

class ModeLearning extends Mode {
	interval = 5000;
	// expiredIn = 1000 * 60 * 60 * 1; // one hour
	expiredIn = 15000;

	buttons = [{text: this.ACTION_STOP}];
	startMessage = 'Learning process has started';

	async init(){
		await super.init();
		await this.start();
	}

	async start(){
		const wordService = new WordService();
		const vocabulary = await wordService.getList(this.chat.user.id);

		const count = vocabulary.length;
		if(!count){
			await this.bot.sendMessage(this.chat.id, 'Please add new words to your vocabulary');
			return this.stop();
		}

		let notShowed = shuffleArray(createArrayOfNumbers(count));

		const wordsList = vocabulary.map(word => {
			return word.value + ' - ' + word.translation;
		});

		await this.bot.sendMessage(this.chat.id, wordsList.join(' \n'));

		const processId = setInterval(() => {
			const index = notShowed.shift();
			const word = vocabulary[index];

			if(notShowed.length < 1){
				notShowed = createArrayOfNumbers(count);
			}

			this.bot.sendMessage(this.chat.id, word.translation + ' - ' + processId, this.createInlineKeyboard([
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

		if(!user.learningId) return false;

		this.initDefaultKeyboard();

		return await UserService.clearLearningProcess(user);
	}
}

module.exports = ModeLearning;