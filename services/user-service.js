const UserDto = require('../dtos/user-dto');
const UserModel = require('../models/user-model');

class UserService {
    static async join(chatId) {
        const candidate = await this.getByChatId(chatId);
        if(candidate){
            return candidate;
        }

        const user = await UserModel.create({chatId});
				const userDto = new UserDto(user);

        return userDto;
    }

		static async setLearningProcess(userId, processId) {
			const user = await UserModel.findOne({where: {id: userId}});
			user.learningId = processId + 0;
			return user.save();
		}

		static async clearLearningProcess(user) {
			if(!user.learningId) return null;

			clearInterval(user.learningId);

			user.learningId = null;
			return user.save();
		}

		static async getById(id) {
			const user = await UserModel.findOne({where: {id}});
			const userDto = new UserDto(user);

      return userDto;
		}

		static async getByChatId(chatId) {
			const user = await UserModel.findOne({where: {chatId:chatId.toString()}});
			const userDto = new UserDto(user);

      return userDto;
		}
    
    static async getAllUsers() {
			const users = await UserModel.findAll();
			return users;
    }
}

module.exports = UserService;