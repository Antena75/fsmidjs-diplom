import { Body, Controller, Get, Param, Post, Put, Query,
  UploadedFiles, UseGuards, UseInterceptors, SetMetadata } from '@nestjs/common';
import { JwtGuard, RolesGuard } from 'src/modules/auth.guard';
import { UploadFiles } from 'src/modules/uploadfiles';
import { ID } from '../type.id';
import { CreateLibraryDto } from './interfaces/create.library';
import { SearchParamsDto } from './interfaces/search.library';
import { UpdateLibraryDto } from './interfaces/update.library';
import { LibrariesService } from './libraries.service';
import { LibraryEntity } from './library.entity';
import { UpdateResult } from 'typeorm';

@Controller('api/libraries')
export class LibrariesController {
  constructor(private librariesService: LibrariesService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', ['admin']) 
  @UseInterceptors(UploadFiles()) 
  createLibrary(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() dataLibrary: CreateLibraryDto,
  ): Promise<LibraryEntity> {
    const data = { ...dataLibrary };
    if (images?.length) { data.images = images.map((img) => img.filename); }
    return this.librariesService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', ['admin']) 
  @UseInterceptors(UploadFiles())
  updateLibrary(
    @Param('id') libraryId: ID,
    @Body() dataLibrary: UpdateLibraryDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<UpdateResult> {
    return this.librariesService.update( libraryId, dataLibrary, images.map((img) => img.filename) );
  }

  @Get()
  searchLibraries(@Query() params: SearchParamsDto): Promise<LibraryEntity[]>{
    return this.librariesService.search(params);
  }

  @Get('/findlibrary/:id')
  findById(@Param('id') libraryId: ID): Promise<LibraryEntity> {
    return this.librariesService.findById(libraryId);
  }
}
