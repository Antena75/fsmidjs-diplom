import { ID } from '../../type.id';

export interface MarkMessagesAsReadDto {
  userId: ID;
  chatId: ID;
  createdBefore: Date;
}
