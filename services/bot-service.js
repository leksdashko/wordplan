const { createArrayOfNumbers } = require("../utils");

class BotService {
	ACTION_START = '/start';
	ACTION_STOP  = '/stop';
	ACTION_ADD   = '/add';

	MESSAGE_START    = 'Start';
	MESSAGE_STOP     = 'Stop';
	MESSAGE_ADD_NEW  = 'Add new';
	MESSAGE_LEARNING = 'Learning';
	MESSAGE_PRACTICE = 'Practice';

	MESSAGE_SKIP      = 'Skip';
	MESSAGE_TRANSLATE = 'Translate';

	bot;
	processId;

	initBot(bot) {
		this.bot = bot;
	}

	start(chatId) {
		return this.bot.sendMessage(chatId, 'Choose your option:', this.createClassicMenu());
	}

	async learning(chatId, vocabulary) {
		if(this.processId) clearInterval(this.processId);

		const count = vocabulary.length;
		if(!count){
			return this.bot.sendMessage(chatId, 'Please add new words to your vocabulary');
		}
		
		await this.bot.sendMessage(chatId, 'Learning process has started');

		let notShowed = createArrayOfNumbers(count);

		this.processId = setInterval(() => {
			const index = notShowed.shift();
			const word = vocabulary[index];

			if(notShowed.length < 1){
				notShowed = createArrayOfNumbers(count);
			}

			this.bot.sendMessage(chatId, word.value, this.createInlineMenu(word));
		}, 3000);
	}

	stop(chatId) {
		if(!this.processId) return false;
		
		clearInterval(this.processId);

		return this.bot.sendMessage(chatId, 'Process has cleared - ' + this.processId);
	}

	async add() {

	}

	createInlineData = (action, id) => {
		return action + '_' + id;
	}
	
	parseInlineData = (data) => {
		const res = data.split('_');
		if(res.length < 2) return;
	
		return {
			id: res[1],
			action: res[0]
		}
	}

	isStart(action){
		if(action === this.ACTION_START || action === this.MESSAGE_START) return true;

		return false;
	}

	isStop(action){
		if(action === this.ACTION_STOP || action === this.MESSAGE_STOP) return true;

		return false;
	}

	isAdd(action){
		if(action === this.ACTION_ADD || action === this.MESSAGE_ADD_NEW) return true;

		return false;
	}

	isLearning(action){
		if(action === this.MESSAGE_LEARNING) return true;

		return false;
	}

	createBasicMenu = () => {
		return [
			{command: this.ACTION_START, description: 'Start bot'},
			{command: this.ACTION_STOP, description: 'Stop bot'},
			{command: this.ACTION_ADD, description: 'Add a new word to vocabulary'}
		];
	}
	
	createClassicMenu = () => {
		return {
			reply_markup: {
				keyboard: [
					[{text: this.MESSAGE_LEARNING}, {text: this.MESSAGE_STOP}],
					[{text: this.MESSAGE_PRACTICE}, {text: this.MESSAGE_ADD_NEW}]
				], 
				resize_keyboard: true
			}
		}
	}
	
	createInlineMenu = (word) => {
		const translate = this.MESSAGE_TRANSLATE;
		const skip = this.MESSAGE_SKIP;
	
		return {
			reply_markup: JSON.stringify({
				inline_keyboard: [
					[
						{text: word.translation, callback_data: this.createInlineData(translate, word.id)},
						{text: skip, callback_data: this.createInlineData(skip, word.id)}
					]
				]
			})
		}
	};
}

module.exports = new BotService();