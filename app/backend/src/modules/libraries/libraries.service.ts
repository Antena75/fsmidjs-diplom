import { Injectable, NotFoundException } from '@nestjs/common';
import { ID } from '../type.id';
import { CreateLibraryDto } from './interfaces/create.library';
import { SearchParamsDto } from './interfaces/search.library';
import { UpdateLibraryDto } from './interfaces/update.library';
import { Library, LibraryEntity } from './library.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, UpdateResult } from 'typeorm';

@Injectable()
export class LibrariesService {
  constructor(
    @InjectRepository(Library) private readonly libraryRepo: Repository<Library>) {}
  async create(dataLibrary: CreateLibraryDto): Promise<LibraryEntity> {
    try {
      const library = await this.libraryRepo.save(dataLibrary);
      return new LibraryEntity(library); 
    } catch (e) {
      console.error(e);
    }
  }

  async update(
    libraryId: ID,
    dataLibrary: UpdateLibraryDto,
    images: string[],
  ): Promise<UpdateResult> {
    const library = await this.findById( libraryId );
    return await this.libraryRepo.update(
      { id: libraryId },
      { ...dataLibrary,
        images, 
      },
    );
  }

  async findById(libraryId: ID): Promise<LibraryEntity> {
    const library = await this.libraryRepo.findOne({
      where: { id: libraryId },
    });
    if (!library) {
      throw new NotFoundException('Библиотека не найдена!');
    }
    return library;
  }

  async search(params: SearchParamsDto): Promise<LibraryEntity[]> {
    const { limit, offset, name } = params;
    return await this.libraryRepo.find({      
      where: { 
        name: Like (`%${name}%`),
      },
      skip: offset,
      take: limit
    });
  }
}
