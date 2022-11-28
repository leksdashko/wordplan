module.exports = class UserDto {
	id;
	learningId;
	
	constructor(model) {
		this.id = model.id;
		this.learningId = model.learningId;
	}
}