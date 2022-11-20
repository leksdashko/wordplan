const UserModel = require('./user-model');
const WordModel = require('./word-model');

UserModel.hasMany(WordModel);
WordModel.belongsTo(UserModel);

module.exports = {
    UserModel,
    WordModel
}