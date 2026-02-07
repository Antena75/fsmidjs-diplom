import { ID } from '../../type.id';

export interface ReturnDataDto {
  token?: string;
  email: string;
  name: string;
  role?: string;
  id: ID;
}
