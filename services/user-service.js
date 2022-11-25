const UserModel = require('../models/user-model');

class UserService {
    static async join(chatId, username = null) {
				chatId = chatId.toString();
				
        const candidate = await this.getByChatId(chatId);
        if(candidate){
            return candidate;
        }

        const user = await UserModel.create({chatId, username});

        return user;
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
			return user;
		}

		static async getByChatId(chatId) {
			const user = await UserModel.findOne({where: {chatId:chatId.toString()}});
			return user;
		}
    
    static async getAllUsers() {
			const users = await UserModel.findAll();
			return users;
    }
}

module.exports = UserService;