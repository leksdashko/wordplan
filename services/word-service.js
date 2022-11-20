const WordModel = require('../models');
const WordDto = require('../dtos/word-dto');
const BotError = require('../exceptions/bot-error');

class UserService {
    async join(chatId, username = null) {
        const candidate = await this.getByChatId(chatId);
        if(candidate){
            return candidate;
        }

        const user = await UserModel.create({chatId, username});
        const userDto = new UserDto(user);

        return {
            user: userDto
        }
    }

		async getByChatId(chatId) {
			const user = await UserModel.findOne({where: {chatId}});
			if(user){
				const userDto = new UserDto(user);
				return {
					user: userDto
				}
			}
			
			return null;
	}
    
    async getAllUsers() {
        const users = await UserModel.findAll();
        return users;
    }
}

module.exports = new UserService();