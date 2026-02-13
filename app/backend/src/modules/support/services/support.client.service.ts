import { Injectable, NotFoundException } from '@nestjs/common';
import { ID } from '../../type.id';
import { UsersService } from '../../users/users.service';
import { CreateRequestDto } from '../interfaces/create.request';
import { Message } from '../entity/message.entity';
import { Chat, ChatEntity } from '../entity/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In} from 'typeorm';

@Injectable()
export class SupportClientService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    private usersService: UsersService,
  ) {}
  async createChat(
    dataReq: CreateRequestDto,
  ): Promise<ChatEntity> {
    const user = await this.usersService.findById(dataReq.userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    try {
      const chat = await this.chatRepo.save({
        userId: dataReq.userId,
      });
      return new ChatEntity(chat);
    } catch (error) {
      console.error(error);
    }
  }

  async getUnreadCount(chatId: ID): Promise<number>{
    const chat = await this.chatRepo.findOne({ where: { id: chatId } });
    const count = await this.messageRepo.find({ 
      where:{
        id: In (chat.messages),
        // authorId: Not (chat.userId),
        readAt: null,
      }
    });
    return count.length;
  }
}

