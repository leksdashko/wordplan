const ChatDto = require('../dtos/chat-dto');
const ChatModel = require('../models/chat-model');

class ChatService {
    static async createChat(chatId) {
        const candidate = await this.getByChatId(chatId);
        if(candidate){
            return candidate;
        }

        const chat = await ChatModel.create({chatId});

				const chatDto = new ChatDto(chat);

        return chatDto;
    }

		static async getById(id) {
			const chat = await ChatModel.findOne({where: {id}});

			const chatDto = new ChatDto(chat);

      return chatDto;
		}

		static async getByChatId(chatId) {
			const chat = await ChatModel.findOne({where: {chatId}});

			const chatDto = new ChatDto(chat);

      return chatDto;
		}
    
    static async getAllChats() {
			const chats = await ChatModel.findAll();
			return chats;
    }
}

module.exports = ChatService;