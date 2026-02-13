import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SupportClientService } from './services/support.client.service';
import { SupportController } from './support.controller';
import { SupportEmployeeService } from './services/support.employee.service';
import { SupportGateway } from './support.gateway';
import { SupportService } from './services/support.service';
import { SocketModule } from '../socket/socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entity/chat.entity';
import { Message } from './entity/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Message]),
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
