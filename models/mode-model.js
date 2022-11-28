const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const ModeModel = sequelize.define('mode', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: {type: DataTypes.STRING, unique: true}
});

module.exports = ModeModel;