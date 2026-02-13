import { Module } from '@nestjs/common';
import { LibrariesController } from './libraries.controller';
import { LibrariesService } from './libraries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from './library.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Library]) ],
  controllers: [LibrariesController],
  providers: [LibrariesService],
  exports: [LibrariesService],
})
export class LibrariesModule {}
