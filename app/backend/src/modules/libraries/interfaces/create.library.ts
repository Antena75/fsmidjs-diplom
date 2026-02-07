import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLibraryDto {
  @IsNotEmpty({message: 'Название библиотеки обязательное поле'})
  @MinLength(5, { message: 'Название библиотеки - не менее 5 символов!' })
  @MaxLength(50, {message: 'Название библиотеки - не более 50 символов!'})
  @IsString()
  readonly name: string;

  @IsNotEmpty({message: 'Название библиотеки обязательное поле'})
  @MinLength(5, { message: 'Название библиотеки - не менее 5 символов!' })
  @MaxLength(100, {message: 'Название библиотеки - не более 100 символов!'})
  @IsString()
  readonly address: string;

  @IsOptional()
  @MaxLength(200, {message: 'Описание библиотеки - не более 200 символов!'})
  @IsString()
  readonly description?: string;

  @IsOptional()
  readonly images?: Express.Multer.File[] | string[];
}
