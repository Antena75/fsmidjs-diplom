import { ID } from '../../type.id';

export interface CreateRequestDto {
  userId: ID;
  text: string;
}