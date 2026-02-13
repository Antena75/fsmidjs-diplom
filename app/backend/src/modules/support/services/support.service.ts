import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ID } from '../../type.id';
import { UsersService } from '../../users/users.service';
import { GetChatListParams } from '../interfaces/get.params';
import { SendMessageDto } from '../interfaces/send.message';
import { Message, MessageEntity } from '../entity/message.entity';
import { MarkMessagesAsReadDto } from '../interfaces/mark.message';
import { Chat, ChatEntity } from '../entity/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, Not, In} from 'typeorm';


@Injectable() 
export class SupportService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  async findChats(params: GetChatListParams): Promise<ChatEntity[]> {
    const chats = await this.chatRepo.find({
      where: {
        userId: params.userId,
        isActive: params.isActive
      }
    })
    const result = [];
    const promises = chats.map(async (chat) => {
    const cht = new ChatEntity(chat)
    cht.user = (await this.usersService.findById(chat.userId))
    result.push(cht)
    })
    await Promise.all(promises)
    return result;
  }

  async sendMessage(dataSend: SendMessageDto): Promise<MessageEntity> {
    const { chatId, authorId, text } = dataSend;
    const chat = await this.chatRepo.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException('Обращение не найдено!');
    }
    const user = await this.usersService.findById(authorId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    if (chat.userId !== authorId && user.role !== 'manager' ) {
      throw new ForbiddenException('Нет доступа к обращению!');
    }
    try {
      const message = await this.messageRepo.save({
        authorId,
        text,
        readAt: null,
      });
      const msg = new MessageEntity(message)
      chat.messages.push(msg.id);
      await this.chatRepo.save(chat);
      
      this.eventEmitter.emit('newMessage', { chat, message }); //запуск события

      return new MessageEntity(message);
    } catch (error) {
      console.error(error);
    }
  }

  async findById(messageId: ID): Promise<MessageEntity> {
    const message = await this.messageRepo.findOne({
      where: { id: messageId },
    });
    if (!message) {
      throw new NotFoundException('Библиотека не найдена!');
    }
    return message;
  }

  async getMessages(chatId: ID, userId: ID): Promise<MessageEntity[]> {
    const chat = await this.chatRepo.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException('Обращение не найдено!');
    }
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    if ( chat.userId !== userId && user.role !== 'manager' ) {
      throw new ForbiddenException('Нет доступа к сообщениям!');
    }
    // if ( chat.userId.toString() !==
    //     new mongoose.Types.ObjectId(userId.toString()).toString() && user.role !== 'manager' ) {
    //   throw new ForbiddenException(
    //     'Нет доступа к сообщениям!',
    //   );
    // }
    const messages = []
    const promises = chat.messages.map(async (message) => {
    const msg = (await this.findById(message))
    messages.push(msg)
    })
    await Promise.all(promises)
    return messages || [];
  }

  async markMessagesAsRead(dataMark: MarkMessagesAsReadDto): Promise<void>  {
    const chat = await this.chatRepo.findOne({where: { id: dataMark.chatId } })
    if (!chat) {
      throw new NotFoundException('Обращение не найдено!');
    }
    await this.messageRepo.update(
      { 
        id: In (chat.messages),
        authorId: Not (dataMark.userId),
        sentAt: LessThan (new Date(dataMark.createdBefore))
      },
      { readAt: new Date() },
    );
  }

  subscribe(
    handler: (chat: ChatEntity, message: MessageEntity) => void,
  ): () => void {
    this.eventEmitter.on('newMessage', ({ chat, message }) => { //ожидание события
      handler(chat, message);
    });
    return;
  }
}
