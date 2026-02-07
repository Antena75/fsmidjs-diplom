import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ID } from '../type.id';
import { UsersService } from '../users/users.service';
import { SupportService } from './services/support.service';
import { Logger } from '@nestjs/common';
 
@WebSocketGateway({ cors: true })
export class SupportGateway {
  constructor(
    private supportService: SupportService,
    private usersService: UsersService,
  ) {}

  @WebSocketServer() 
  public server: Server;
  private logger: Logger = new Logger();
  handleConnection (client: Socket) {this.logger.log(`Client connected: ${client.id}`);}
  handleDisconnect (client: Socket) {this.logger.log(`Client disconnected: ${client.id}`);}
  
  @SubscribeMessage('subscribeToChat')
  async handleSubscribeToChat(
    @MessageBody() payload: { chatId: ID },
    @ConnectedSocket() client: Socket,
  ) {
    return this.supportService.subscribe(async (chat, message) => { //передача функции слушателя события
      if (chat._id.toString() === payload.chatId) {
        const { _id, readAt, text, authorId } = message;
        const { _id: userId, name } = await this.usersService.findById(authorId);
        const response = {
          _id,
          sentAt: message['sentAt'],
          text,
          readAt,
          author: { id: userId, name: name }
        };
        client.emit('subscribeToChat', response);
      }
    });
  }
} 
