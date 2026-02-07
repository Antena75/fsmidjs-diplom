import { IsNotEmpty, IsOptional, IsString,  MaxLength, MinLength } from 'class-validator';
import { ID } from '../../type.id';

export class CreateBookDto {
  @IsNotEmpty({message: 'ID библиотеки обязательное поле',})
  @IsString()
  readonly library: ID;

  @IsNotEmpty({message: 'Название книги обязательное поле',})
  @MinLength(5, { message: 'Название книги- не менее 5 символов!' })
  @MaxLength(100, {message: 'Название книги - не более 50 символов!'})
  @IsString()
  readonly title: string;

  @IsNotEmpty({message: 'Автор книги обязательное поле',})
  @MinLength(5, { message: 'Название книги - не менее 5 символов!' })
  @MaxLength(100, {message: 'Название книги - не более 50 символов!'})
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsString()
  readonly year?: string;  

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  readonly images?: Express.Multer.File[] | string[];

  @IsString()
  readonly totalCopies?: string;

  @IsString()
  readonly availableCopies?: string;
}

