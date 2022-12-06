const botService = require("../services/bot-service");
const UserService = require("../services/user-service");
const WordService = require("../services/word-service");
const { createArrayOfNumbers, shuffleArray } = require("../utils");
const Mode = require("./mode");

class ModeLearning extends Mode {
	ID = 2;
	interval = 60000;
	expiredIn = 1000 * 60 * 60 * 1; // one hour

	vocabulary = [];

	buttons = [{text: this.ACTION_STOP}];
	startMessage = 'Learning process has started';

	async init(){
		await super.init();
		await this.start();
	}

	async start(){
		this.vocabulary = await WordService.getList(this.chat.user.id);

		const count = this.vocabulary.length;
		if(!count){
			await this.chat.bot.sendMessage(this.chat.chatId, 'Please add new words to your vocabulary:');
			return this.stop();
		}

		let notShowed = shuffleArray(createArrayOfNumbers(count));

		const wordsList = this.vocabulary.map(word => {
			return word.value + ' - ' + word.translation;
		});

		await this.chat.bot.sendMessage(this.chat.chatId, wordsList.join(' \n'));

		let showValue = true;

		const processId = setInterval(async () => {
			const index = notShowed.shift();
			const word = this.vocabulary[index];

			const value = showValue ? word.value : word.translation;
			const explanation = showValue ? word.translation : word.value;

			await this.chat.bot.sendMessage(this.chat.chatId, value + ' - ||' + explanation + '|| - ' + processId, this.createInlineKeyboard([
				[
					{text: this.ACTION_SKIP, callback_data: botService.createInlineData(this.ACTION_SKIP, word.id)},
					{text: this.ACTION_EDIT, callback_data: botService.createInlineData(this.ACTION_EDIT, word.id)}
				]
			]));

			if(notShowed.length < 1){
				showValue = !showValue;
				notShowed = createArrayOfNumbers(count);
			}
		}, this.interval);

		setTimeout(() => {
			this.stop();
		}, this.expiredIn);

		return await UserService.setLearningProcess(this.chat.user.id, processId);
	}

	async stop() {
		const user = await UserService.getById(this.chat.user.id);
		if(!user.learningId) return;

		this.initDefaultKeyboard();

		return await UserService.clearLearningProcess(user);
	}
}

module.exports = ModeLearning;