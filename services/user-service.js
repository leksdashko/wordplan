const UserModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto');
const BotError = require('../exceptions/bot-error');

class UserService {
    async join(chatId, username = null) {
        const candidate = await UserModel.findOne({where: {chatId}});
        if(candidate){
            throw BotError.BadRequest(`User not found`);
        }

        const user = await UserModel.create({chatId, username});
        const userDto = new UserDto(user);

        return {
            user: userDto
        }
    }
    
    async getAllUsers() {
        const users = await UserModel.findAll();
        return users;
    }
}

module.exports = new UserService();