import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from '../books/books.module';
import { LibrariesModule } from '../libraries/libraries.module';
import { UsersModule } from '../users/users.module';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { Rentals, RentalsSchema } from './rentals.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rentals.name, schema: RentalsSchema }]),
    UsersModule,
    LibrariesModule,
    BooksModule,
  ],
  providers: [RentalsService],
  controllers: [RentalsController],
})
export class RentalsModule {}
