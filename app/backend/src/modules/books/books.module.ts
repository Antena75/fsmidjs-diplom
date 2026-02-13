import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { LibrariesModule } from '../libraries/libraries.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../books/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    LibrariesModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
