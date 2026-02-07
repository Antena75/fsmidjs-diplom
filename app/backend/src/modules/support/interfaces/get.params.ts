import { ID } from '../../type.id';

export interface GetChatListParams {
  userId: ID | null;
  isActive: boolean;
}
