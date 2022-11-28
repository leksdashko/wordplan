const UserModel = require('./user-model');
const WordModel = require('./word-model');
const ChatModel = require('./chat-model');
const ModeModel = require('./mode-model');

ModeModel.hasOne(ChatModel);
ChatModel.belongsTo(ModeModel);

UserModel.hasOne(ChatModel);
ChatModel.belongsTo(UserModel);

UserModel.hasMany(WordModel);
WordModel.belongsTo(UserModel);

module.exports = {
    UserModel,
    WordModel,
		ChatModel,
		ModeModel
}