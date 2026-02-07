import { Body, Controller, Get, Param, Post, Put, Query,
  UploadedFiles, UseGuards, UseInterceptors, SetMetadata } from '@nestjs/common';
import { UploadFiles } from 'src/modules/uploadfiles';
import { JwtGuard,  RolesGuard} from '../auth.guard';
import { ID } from '../type.id';
import { CreateBookDto } from './interfaces/create.book';
import { SearchBookParamsDto } from './interfaces/search.book';
import { UpdateBookDto } from './interfaces/update.book';
import { BooksService } from './books.service';
import { BooksDocument } from './books.schema';

@Controller('api/books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', ['admin']) 
  @UseInterceptors(UploadFiles())
  createBook(
    @Body() dataBook: CreateBookDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<BooksDocument> {
    const data = { ...dataBook };
    if (images?.length) { data.images = images.map((img) => img.filename); }
    return this.booksService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', ['admin']) 
  @UseInterceptors(UploadFiles())
  updateBook(
    @Param('id') bookId: ID,
    @Body() dataBook: UpdateBookDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<BooksDocument> {
    return this.booksService.update( bookId, dataBook, images.map((img) => img.filename) );
  }

  @Get()
  searchBooks(
    @Query() params: SearchBookParamsDto,
  ): Promise<BooksDocument[]> {
    return this.booksService.search(params);
  }
}
