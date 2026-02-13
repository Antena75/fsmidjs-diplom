import { Module } from '@nestjs/common';
import { BooksModule } from '../books/books.module';
import { LibrariesModule } from '../libraries/libraries.module';
import { UsersModule } from '../users/users.module';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './rental.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental, ]),
    UsersModule,
    LibrariesModule,
    BooksModule,
  ],
  providers: [RentalsService],
  controllers: [RentalsController],
})
export class RentalsModule {}