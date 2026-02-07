import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Books, BooksSchema } from './books.schema';
import { LibrariesModule } from '../libraries/libraries.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Books.name, schema: BooksSchema } ]),
    LibrariesModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
