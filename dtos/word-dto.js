module.exports = class WordDto {
	id;
  value;
	translation;
    
	constructor(model) {
		this.id = model.id;
		this.value = model.value;
		this.translation = model.translation;
	}
}