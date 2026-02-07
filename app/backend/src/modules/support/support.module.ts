import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { Message, MessageSchema } from './schemas/message.schema';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { SupportClientService } from './services/support.client.service';
import { SupportController } from './support.controller';
import { SupportEmployeeService } from './services/support.employee.service';
import { SupportGateway } from './support.gateway';
import { SupportService } from './services/support.service';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema }
    ]),
    UsersModule,
    SocketModule,
  ],
  controllers: [SupportController],
  providers: [
    SupportService,
    SupportClientService,
    SupportEmployeeService,
    SupportGateway
  ],
})
export class SupportModule {}
