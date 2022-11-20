const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const WordModel = sequelize.define('word', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	value: {type: DataTypes.STRING},
	translation: {type: DataTypes.STRING}
});

module.exports = WordModel;