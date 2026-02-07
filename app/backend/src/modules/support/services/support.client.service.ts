import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from '../../type.id';
import { UsersService } from '../../users/users.service';
import { CreateRequestDto } from '../interfaces/create.request';
import { MarkMessagesAsReadDto } from '../interfaces/mark.message';
import { Message, MessageDocument } from '../schemas/message.schema';
import { Chat } from '../schemas/chat.schema';

@Injectable()
export class SupportClientService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private usersService: UsersService,
  ) {}
  async createChat(
    dataReq: CreateRequestDto,
  ): Promise<Chat> {
    const user = await this.usersService.findById(dataReq.userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }

    try {
      const createdChat = new this.chatModel({
        userId: dataReq.userId,
      });
      return createdChat.save();
    } catch (error) {
      console.error(error);
    }
  }

  async getUnreadCount(chatId: ID): Promise<number> {
    const chat = await this.chatModel.findById(chatId)
    const count = await this.messageModel.countDocuments(
      {
        _id: { $in: chat.messages },
        // authorId: { $ne: chat.userId },
          readAtAt: null,
      },
    );
    return count;
  }
  
  // async markMessagesAsRead(dataMark: MarkMessagesAsReadDto): Promise<void>  {    // на всякий случай
  //   const chat = await this.chatModel.findById(dataMark.chatId)
  //   if (!chat) {
  //     throw new NotFoundException('Обращение не найдено!');
  //   }
  //   await this.messageModel.updateMany(
  //     {
  //       _id: { $in: chat.messages },
  //       authorId: { $ne: dataMark.userId },
  //       sentAt: { $lte: dataMark.createdBefore },
  //     },
  //     { $set: { readAt: new Date() } },
  //   );
  // }
}

