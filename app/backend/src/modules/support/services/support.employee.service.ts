import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from 'src/modules/type.id';
import { MarkMessagesAsReadDto } from '../interfaces/mark.message';
import { Message } from '../schemas/message.schema';
import { Chat } from '../schemas/chat.schema';

@Injectable()
export class SupportEmployeeService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async closeRequest(chatId: ID): Promise<void> {
    await this.chatModel.updateOne(
      { _id: chatId },
      { isActive: false },
    );
  }

    async markMessagesAsRead(dataMark: MarkMessagesAsReadDto): Promise<void>  {
    const chat = await this.chatModel.findById(dataMark.chatId)
    if (!chat) {
      throw new NotFoundException('Обращение не найдено!');
    }
    await this.messageModel.updateMany(
      {
        _id: { $in: chat.messages },
        authorId: { $ne: dataMark.userId },
        sentAt: { $lte: dataMark.createdBefore },
      },
      { $set: { readAt: new Date() } },
    );
  }
}
