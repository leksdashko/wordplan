module.exports = class WordDto {
	constructor(model) {
		this.id = model.id;
		this.value = model.value;
		this.translation = model.translation;
	}
}