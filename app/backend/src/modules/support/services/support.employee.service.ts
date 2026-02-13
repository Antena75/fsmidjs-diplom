import { Injectable } from '@nestjs/common';
import { ID } from 'src/modules/type.id';
import { Chat } from '../entity/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SupportEmployeeService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
  ) {}

  async closeRequest(chatId: ID): Promise<void> {
    await this.chatRepo.update(
      { id: chatId },
      { isActive: false },
    );
  }
}
