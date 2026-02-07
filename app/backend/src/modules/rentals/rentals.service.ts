import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from '../type.id';
import { BooksService } from '../books/books.service';
import { LibrariesService } from '../libraries/libraries.service';
import { UsersService } from '../users/users.service';
import { RentalDto } from './interfaces/rental';
import { Rentals, RentalsDocument } from './rentals.schema';

@Injectable()
export class RentalsService {
  constructor(
    @InjectModel(Rentals.name)
    private rentalsModel: Model<Rentals>,
    private usersService: UsersService,
    private librariesService: LibrariesService,
    private booksService: BooksService,
  ) {}

  async createRental(dataRental: RentalDto): Promise<RentalsDocument> {
    const user = await this.usersService.findById(dataRental.userId);
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
    const count = await this.rentalsModel.countDocuments({
      bookId: dataRental.bookId,
      libraryId: dataRental.libraryId,
      dateStart: { $lt: new Date(dataRental.dateEnd).toISOString() },
      dateEnd: { $gt: new Date(dataRental.dateStart).toISOString() },
    });

    if (count !== 0) {
      throw new BadRequestException('Книга не доступна (арендована)');
    }
    try {
      const rental = new this.rentalsModel(dataRental);
      return rental.save();
    } catch (e) {
      console.error(e);
    }
  }

  async removeRental(
    rentalId: ID,
  ): Promise<RentalsDocument> {
    const rental = await this.rentalsModel.findById(rentalId);
    if (!rental) {
      throw new NotFoundException('Аренда не найдена!');
    }
    try {
      return this.rentalsModel.findByIdAndDelete(rentalId);
    } catch (error) {
      console.error(error);
    }
  }
  
  async searchRentals(
    searchParams: Partial<RentalDto>,
  ): Promise<RentalsDocument[]> {
    const { userId } = searchParams;
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }

    return await this.rentalsModel.find({ userId })
      .populate('userId', ['email'])
      .populate('libraryId', ['name'])
      .populate('bookId', ['title'])
  }
}
