import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ID } from '../type.id';
import { BooksService } from '../books/books.service';
import { LibrariesService } from '../libraries/libraries.service';
import { UsersService } from '../users/users.service';
import { RentalDto } from './interfaces/Rental';
import { Rental, RentalEntity } from './rental.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, MoreThan, LessThan } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental) private readonly rentalRepo: Repository<Rental>,
    private usersService: UsersService,
    private librariesService: LibrariesService,
    private booksService: BooksService,
  ) {}
 
  async createRental(dataRental: RentalDto, cUser: UserEntity): Promise<RentalEntity> {
    const user = await this.usersService.findById(cUser.id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    const library = await this.librariesService.findById(dataRental.libraryId);
    if (!library) {
      throw new NotFoundException('Библитека не найдена!');
    }
    const book = await this.booksService.findById(dataRental.bookId);
    if (!book) {
      throw new NotFoundException('Книга не найдена!');
    }
    const count = await this.rentalRepo.find({
      where: {
        bookId: dataRental.bookId,
        libraryId: dataRental.libraryId,
        dateStart: LessThan (new Date(dataRental.dateEnd)),
        dateEnd: MoreThan (new Date(dataRental.dateStart)),
      }
    });

    if (count.length !== 0) {
      throw new BadRequestException('Книга не доступна (арендована)');
    }
    try {
      dataRental.userId = cUser.id;
      const rental = await this.rentalRepo.save(dataRental);
      return new RentalEntity(rental); 
    } catch (e) {
      console.error(e);
    }
  }

  async removeRental(
    rentalId: ID,
  ): Promise<DeleteResult> {  
    const rental = await this.rentalRepo.findOne({ where: { id: rentalId } });
    if (!rental) {
      throw new NotFoundException('Аренда не найдена!');
    }
    try {
      return await this.rentalRepo.delete(rentalId);
    } catch (error) {
      console.error(error);
    }
  }
  
  async searchRentals(
    searchParams: Partial<RentalDto>,
  ): Promise<RentalEntity[]> {
    const { userId } = searchParams;
    const user = await this.usersService.findById( userId );
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }
    const rentals = await this.rentalRepo.find({ where: { userId } })
    const result = [];
    const promises = rentals.map(async (rental) => {
    const rent = new RentalEntity(rental)
    rent.libraryName = (await this.librariesService.findById(rental.libraryId)).name
    rent.bookName = (await this.booksService.findById(rental.bookId)).title
    result.push(rent)
    })
    await Promise.all(promises)
    return result;
  }
}