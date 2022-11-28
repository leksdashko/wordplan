const UserDto = require('../dtos/user-dto');
const ChatModel = require('../models/chat-model');
const UserModel = require('../models/user-model');

class UserService {
    static async join(chatId) {
        const candidate = await this.getByChatId(chatId);
        if(candidate){
            return candidate;
        }

        const user = await UserModel.create();
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

			if(!user) return;

			const userDto = new UserDto(user);

      return userDto;
		}

		static async getByChatId(chatId) {
			const chat = await ChatModel.findOne({where: {chatId}});

			if(!chat?.userId) return;

			const user = await UserModel.findOne({where: {id: chat.userId}});
			
			const userDto = new UserDto(user);

      return userDto;
		}
    
    static async getAllUsers() {
			const users = await UserModel.findAll();
			return users;
    }
}

module.exports = UserService;