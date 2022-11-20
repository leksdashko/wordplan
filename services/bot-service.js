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

	async start() {

	}

	async stop() {

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
					[{text: this.MESSAGE_START}, {text: this.MESSAGE_STOP}, {text: this.MESSAGE_ADD_NEW}],
					[{text: this.MESSAGE_LEARNING}, {text: this.MESSAGE_PRACTICE}]
				], 
				resize_keyboard: true
			}
		}
	}
	
	createInlineMenu = (data) => {
		const translate = this.MESSAGE_TRANSLATE;
		const skip = this.MESSAGE_SKIP;
	
		return {
			reply_markup: JSON.stringify({
				inline_keyboard: [
					[
						{text: translate, callback_data: this.createInlineData(translate, data.id)},
						{text: skip, callback_data: this.createInlineData(skip, data.id)}
					]
				]
			})
		}
	};
}

module.exports = new BotService();