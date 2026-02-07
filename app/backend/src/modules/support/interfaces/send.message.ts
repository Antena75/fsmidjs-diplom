import { ID } from '../../type.id';

export interface SendMessageDto {
  authorId: ID;
  chatId: ID;
  text: string;
}
