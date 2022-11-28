const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const UserModel = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    learningId: {type: DataTypes.STRING}
});

module.exports = UserModel;