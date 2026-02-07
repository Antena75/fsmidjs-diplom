import { Body, Controller, Get, Param, Post, Query, Request, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtGuard, RolesGuard} from '../auth.guard';
import { ID } from '../type.id';
import { CreateRequestDto } from './interfaces/create.request';
import { ClientAnswerDto } from './interfaces/client.answer';
import { GetChatListParams } from './interfaces/get.params';
import { MarkMessagesAsReadDto } from './interfaces/mark.message';
import { SendMessageDto } from './interfaces/send.message';
import { MessageDocument } from './schemas/message.schema';
import { ChatDocument } from './schemas/chat.schema';
import { SupportClientService } from './services/support.client.service';
import { SupportEmployeeService } from './services/support.employee.service';
import { SupportService } from './services/support.service';

@UseGuards(JwtGuard, RolesGuard)
@Controller('api/support')
export class SupportController {
  constructor(
    private supportService: SupportService,
    private supportClientService: SupportClientService,
    private supportEmployeeService: SupportEmployeeService,
  ) {}

  
  @Post()
  @SetMetadata('roles', ['client']) 
  async createChat(@Body() dataReq: CreateRequestDto): Promise <ClientAnswerDto> {
    const newRequest = await this.supportClientService.createChat(dataReq);
    await this.supportService.sendMessage({
      authorId: dataReq.userId,
      chatId: newRequest.id,
      text: dataReq.text,
    });
    const count = await this.supportClientService.getUnreadCount(
      newRequest.id,
    );
    return {
      id: newRequest.id,
      createdAt: newRequest['createdAt'],
      isActive: newRequest.isActive,
      hasNewMessages: count > 0,
    };
  }

  @Get()
  async findChats(@Query() params: GetChatListParams): Promise<ChatDocument[]> {
    return await this.supportService.findChats(params);
  }

  @Post('/sendmessage')
  @SetMetadata('roles', ['client', 'manager']) 
  async sendMessage(@Body() dataSend: SendMessageDto): Promise<MessageDocument> {
    return await this.supportService.sendMessage(dataSend);
  }

  @Get('/getmessages/:id')
  @SetMetadata('roles', ['client', 'manager']) 
  async getMessages(
    @Param('id') chatId: ID,
    @Query() data: { userId: ID },
  ): Promise<MessageDocument[]> {
    return await this.supportService.getMessages(chatId, data.userId);
  }

  @Post('/readmessages')
  @SetMetadata('roles', ['client', 'manager']) 
  async readMessages(
    @Body() dataMark: MarkMessagesAsReadDto,
    @Request() request: any,
  ): Promise<void>  {
    if (request.user?.role === 'client') {
    //   await this.supportClientService.markMessagesAsRead(dataMark); // на всякий случай
    // } else {
      await this.supportEmployeeService.markMessagesAsRead(dataMark);
    }
  }

  @Post('/closerequest/:id')
  @SetMetadata('roles', ['manager']) 
  async closeRequest(@Param('id') chatId: ID): Promise<void>  {
    await this.supportEmployeeService.closeRequest(chatId);
  }
}
