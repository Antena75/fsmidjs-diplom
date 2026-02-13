import { Injectable, NotFoundException } from '@nestjs/common';
import { ID } from '../type.id';
import { CreateBookDto } from './interfaces/create.book';
import { SearchBookParamsDto } from './interfaces/search.book';
import { UpdateBookDto } from './interfaces/update.book';
import { LibrariesService } from '../libraries/libraries.service';
import { Book, BookEntity } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, UpdateResult } from 'typeorm';


@Injectable()
export class BooksService {
  constructor(
    private librariesService: LibrariesService,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>) {}
    
  async create(dataBook: CreateBookDto): Promise<BookEntity> {
    const library = await this.librariesService.findById(dataBook.library);
    if (!library) {
      throw new NotFoundException('Библиотека не найдена!');
    }
    try {
      const book = await this.bookRepo.save({
        library: dataBook.library,
        title: dataBook.title,
        author: dataBook.author,
        year: Number(dataBook.year),
        description: dataBook.description,
        images: dataBook.images,
        totalCopies: Number(dataBook.totalCopies) || 1,
        availableCopies: Number(dataBook.availableCopies) || 1,
    });
      return new BookEntity(book); 
    } catch (e) {
      console.error(e);
    }
  }

  async update(
    bookId: ID,
    dataBook: UpdateBookDto,
    images: string[],
  ): Promise<UpdateResult> {
    const book = await this.findById(bookId); // Проверка наличия
    return await this.bookRepo.update(
      { id: bookId },
      { ...dataBook, images },
    );
  }

  async findById(bookId: ID): Promise<BookEntity>  {
    const book = await this.bookRepo.findOne({
      where: { id: bookId },
    });
    if (!book) {
      throw new NotFoundException('Книга не найдена!');
    }
    return book;
  }

  async search(params: SearchBookParamsDto): Promise<BookEntity[]>  {
    const { limit, offset, library, title, author } = params;
    return await this.bookRepo.find({      
      where: { 
        library,
        title: Like (`%${title}%`),
        author: Like (`%${author}%`)
      },
      skip: offset,
      take: limit
    });
  }
}