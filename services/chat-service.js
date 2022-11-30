const ChatDto = require('../dtos/chat-dto');
const UserDto = require('../dtos/user-dto');
const ChatModel = require('../models/chat-model');
const UserModel = require('../models/user-model');
const ModeService = require('./mode-service');

class ChatService {
    static async createChat(chatId) {
				chatId = chatId.toString();
				
        const candidate = await this.getByChatId(chatId);
        if(candidate){
            return candidate;
        }

        const chat = await ChatModel.create({chatId});

				const chatDto = new ChatDto(chat);
				await chatDto.build();

        return chatDto;
    }

		static async getById(id) {
			const chat = await ChatModel.findOne({where: {id}});

			if(!chat) return;

			const chatDto = new ChatDto(chat);
			await chatDto.build();

      return chatDto;
		}

		static async getByChatId(chatId) {
			const chat = await ChatModel.findOne({where: {chatId}});

			if(!chat) return;

			const chatDto = new ChatDto(chat);
			await chatDto.build();

      return chatDto;
		}
    
    static async getAllChats() {
			const chats = await ChatModel.findAll();
			return chats;
    }
}

module.exports = ChatService;