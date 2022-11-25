const UserModel = require('../models/user-model');

class UserService {
    async join(chatId, username = null) {
				chatId = chatId.toString();
				
        const candidate = await this.getByChatId(chatId);
        if(candidate){
            return candidate;
        }

        const user = await UserModel.create({chatId, username});

        return user;
    }

		async setLearningProcess(userId, processId) {
			const user = await UserModel.findOne({where: {id: userId}});
			user.learningId = processId;
			return user.save();
		}

		async clearLearningProcess(userId) {
			const user = await UserModel.findOne({where: {id: userId}});

			clearInterval(user.learningId);

			user.learningId = null;
			return user.save();
		}

		async getByChatId(chatId) {
			const user = await UserModel.findOne({where: {chatId:chatId.toString()}});
			return user;
		}
    
    async getAllUsers() {
        const users = await UserModel.findAll();
        return users;
    }
}

module.exports = UserService;