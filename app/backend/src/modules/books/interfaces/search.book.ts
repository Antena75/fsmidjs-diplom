import { ID } from '../../type.id';

export interface SearchBookParamsDto {
  library: ID;
  title?: string;
  author?: string;
  limit?: number;
  offset?: number;
  isAvailable?: string;
}
