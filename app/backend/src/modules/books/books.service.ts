import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from '../type.id';
import { CreateBookDto } from './interfaces/create.book';
import { SearchBookParamsDto } from './interfaces/search.book';
import { UpdateBookDto } from './interfaces/update.book';
import { Books, BooksDocument } from './books.schema';
import { LibrariesService } from '../libraries/libraries.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Books.name) 
    private booksModel: Model<Books>,
    private librariesService: LibrariesService,
  ) {}

  async create(dataBook: CreateBookDto): Promise<BooksDocument> {
    const library = await this.librariesService.findById(dataBook.library);
    if (!library) {
      throw new NotFoundException('Библиотека не найдена!');
    }
    try {
      const createdBook = new this.booksModel({
        library: dataBook.library,
        title: dataBook.title,
        author: dataBook.author,
        year: dataBook.year,
        description: dataBook.description,
        images: dataBook.images,
        totalCopies: dataBook.totalCopies || '1',
        availableCopies: dataBook.availableCopies || '1',
    });
      return createdBook.save();
    } catch (e) {
      console.error(e);
    }
  }

  async update(
    bookId: ID,
    dataBook: UpdateBookDto,
    images: string[],
  ): Promise<BooksDocument> {
    const book = await this.findById(bookId); // Проверка наличия
    return await this.booksModel.findByIdAndUpdate(
      { _id: bookId },
      { $set: { ...dataBook, images} },
      { new: true },
    );
  }

  async findById(bookId: ID): Promise<BooksDocument> {
    const book = await this.booksModel.findById(bookId);
    if (!book) {
      throw new NotFoundException('Книга не найдена!');
    }
    return book;
  }

  async search(params: SearchBookParamsDto): Promise<BooksDocument[]> {
    const { limit, offset, library, title, author } = params;
    const query = {
      library,
      title: { $regex: new RegExp(title, 'i') },
      author: { $regex: new RegExp(author, 'i') },
    };
    return await this.booksModel.find(query).limit(limit || 0).skip(offset || 0);
  }
}