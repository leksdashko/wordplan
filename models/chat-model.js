const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const ChatModel = sequelize.define('chat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		chatId: {type: DataTypes.INTEGER, unique: true}
});

module.exports = ChatModel;