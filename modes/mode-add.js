const botService = require("../services/bot-service");
const WordService = require("../services/word-service");
const Mode = require("./mode");

class ModeAdd extends Mode {
	ID = 4;
	buttons = [{text: this.ACTION_CANCEL}];

	async init(){
		await super.init();

		this.chat.bot.sendMessage(this.chat.chatId, 'Err - err', this.createInlineKeyboard([
			{text: this.ACTION_UPDATE, callback_data: botService.createInlineData(this.ACTION_UPDATE, 123)}
		]));

		
	}

	async push(data){
		super.push(data);

		const addingWord = await this.chat.user.getAddingWord();
		if(addingWord){
			addingWord.setTranslation(this.data.shift());
			await addingWord.save();
			return await this.chat.user.setAddingWord(null);
		}else{
			const word = await WordService.add(this.chat.user.id, this.data.shift());
			return await this.chat.user.setAddingWord(word);
		}
	}
}

module.exports = ModeAdd;