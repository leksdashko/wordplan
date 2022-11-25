const WordService = require("../../services/word-service");
const { createArrayOfNumbers, shuffleArray } = require("../../utils");
const Mode = require("./mode");

class ModeLearning extends Mode {
	buttons = [{text: this.ACTION_STOP}];
	startMessage = 'Learning process has started';

	async init(){
		await super.init();
		await this.start();
	}

	async start(){
		const wordService = new WordService();
		const vocabulary = await wordService.getList(this.user.id);

		const count = vocabulary.length;
		if(!count){
			await this.bot.sendMessage(this.chatId, 'Please add new words to your vocabulary');
			return this.clear();
		}

		let notShowed = shuffleArray(createArrayOfNumbers(count));

		const wordsList = vocabulary.map(word => {
			return word.value + ' - ' + word.translation;
		});

		await this.bot.sendMessage(this.chatId, wordsList.join(' \n'));

		const processId = setInterval(() => {
			const index = notShowed.shift();
			const word = vocabulary[index];

			if(notShowed.length < 1){
				notShowed = createArrayOfNumbers(count);
			}

			this.bot.sendMessage(this.chatId, word.translation + ' - ' + processId);
		}, 60000);

		this.user.learningId = processId + 0;
		this.user.save();
	}
}

module.exports = ModeLearning;