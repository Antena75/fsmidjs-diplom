import { ID } from '../../type.id';

export interface RentalDto {
  userId: ID;
  libraryId: ID;
  bookId: ID;
  dateStart: Date;
  dateEnd: Date;
}

