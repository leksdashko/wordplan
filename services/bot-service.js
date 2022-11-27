const { createArrayOfNumbers } = require("../utils");
const userService = require("./user-service");
const wordService = require("./word-service");

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

	isAddMode = false;
	currentTranslation = {
		value: null,
		translation: null
	};

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

	async stop(chatId) {
		this.deactivateAddMode();

		if(this.processId) {
			const processId = this.processId;

			clearInterval(this.processId);

			this.processId = null;

			return this.bot.sendMessage(chatId, 'Process has cleared - ' + processId);
		}
	}

	async add(chatId, string) {
		if(!this.currentTranslation.value){
			this.currentTranslation.value = string;
			return this.type(chatId);
		}else{
			this.currentTranslation.translation = string;

			const user = await userService.getByChatId(chatId);
			const word = await wordService.add(user.id, this.currentTranslation.value, this.currentTranslation.translation);

			this.clearCurrentTranslation();

			await this.bot.sendMessage(chatId, 'New translation ['+word.value+' - '+word.translation+'] added');

			return this.type(chatId);
		}
	}

	type = (chatId) => {
		let message = 'Type some phrase:';
		if(this.currentTranslation.value){
			message = 'Type translation:';
		}

		return this.bot.sendMessage(chatId, message);
	}
 
	activateAddMode = () => {
		if(!this.isAddMode){
			this.isAddMode = true;
		}
	}

	deactivateAddMode = () => {
		if(this.isAddMode){
			this.isAddMode = false;
			this.clearCurrentTranslation();
		}
	}

	clearCurrentTranslation = () => {
		this.currentTranslation = {
			value: null,
			translation: null
		}
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
	
	
}

module.exports = new BotService();