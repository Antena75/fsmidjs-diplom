import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '../../type.id';
import { UsersService } from '../../users/users.service';
import { GetChatListParams } from '../interfaces/get.params';
import { SendMessageDto } from '../interfaces/send.message';
import { Message, MessageDocument } from '../schemas/message.schema';
import { Chat, ChatDocument } from '../schemas/chat.schema';

@Injectable() 
export class SupportService {
  constructor(
    @InjectModel(Chat.name) private supportModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  async findChats(params: GetChatListParams): Promise<ChatDocument[]> {
    return this.supportModel
      .find(params)
      .populate('userId', ['email', 'name', 'contactPhone'])
  }

  async sendMessage(dataSend: SendMessageDto): Promise<MessageDocument> {
    const { chatId, authorId, text } = dataSend;
    const chat = await this.supportModel.findById(chatId)
    if (!chat) {
      throw new NotFoundException('Обращение не найдено!');
    }
    const user = await this.usersService.findById(authorId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    if (chat.userId.toString() !==
        new mongoose.Types.ObjectId(authorId.toString()).toString() && user.role !== 'manager' ) {
      throw new ForbiddenException(
        'Нет доступа к обращению!',
      );
    }
    try {
      const message = new this.messageModel({
        authorId,
        text,
        readAt: null,
      });
      await message.save();

      chat.messages.push(message);
      await chat.save();
      
      this.eventEmitter.emit('newMessage', { chat, message }); //запуск события

      return message;
    } catch (error) {
      console.error(error);
    }
  }

  async getMessages(chatId: ID, userId: ID): Promise<MessageDocument[]> {
    const chat = await this.supportModel.findById(chatId);
    if (!chat) {
      throw new NotFoundException('Обращение не найдено!');
    }
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    if ( chat.userId.toString() !==
        new mongoose.Types.ObjectId(userId.toString()).toString() && user.role !== 'manager' ) {
      throw new ForbiddenException(
        'Нет доступа к сообщениям!',
      );
    }
    return chat.messages || [];
  }

  subscribe(
    handler: (chat: ChatDocument, message: MessageDocument) => void,
  ): () => void {
    this.eventEmitter.on('newMessage', ({ chat, message }) => { //ожидание события
      handler(chat, message);
    });
    return;
  }
}
