const botService = require("../services/bot-service");
const WordService = require("../services/word-service");
const Mode = require("./mode");

class ModeAdd extends Mode {
	ID = 4;
	buttons = [{text: this.ACTION_STOP}];

	async init(){
		await super.init();

		return this.typeWord();
	}

	async push(data){
		super.push(data);

		const addingWord = await this.chat.user.getAddingWord();
		if(addingWord){
			addingWord.setTranslation(this.data.shift());
			await addingWord.save();
			await this.chat.user.setAddingWord(null);

			await this.wordAdded(addingWord);

			return this.typeWord();
		}else{
			const word = await WordService.add(this.chat.user.id, this.data.shift());
			await this.chat.user.setAddingWord(word);

			return this.typeExplanation();
		}
	}

	wordAdded(word){
		return this.chat.bot.sendMessage(this.chat.chatId, word.value + ' - ' + word.translation,
			this.createInlineKeyboard([[
				{text: this.ACTION_EDIT, callback_data: botService.createInlineData(this.ACTION_EDIT, word.id)}
			]])
		);
	}

	typeExplanation(){
		return this.chat.bot.sendMessage(this.chat.chatId, 'Type a translation:');
	}

	typeWord(){
		return this.chat.bot.sendMessage(this.chat.chatId, 'Type a word:');
	}
}

module.exports = ModeAdd;