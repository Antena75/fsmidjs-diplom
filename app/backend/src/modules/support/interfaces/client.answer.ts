import { ID } from '../../type.id';

export interface ClientAnswerDto {
  id: ID;
  createdAt: Date;
  isActive: boolean;
  hasNewMessages: boolean;
}