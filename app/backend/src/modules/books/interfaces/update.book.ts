import { IsNotEmpty, IsOptional, IsString,  MaxLength, MinLength } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty({message: 'Название книги - обязательное поле',})
  @MinLength(5, { message: 'Название книги- не менее 5 символов!' })
  @MaxLength(100, {message: 'Название книги - не более 50 символов!'})
  @IsString()
  readonly title: string;

  @IsNotEmpty({message: 'Автор книги - обязательное поле',})
  @MinLength(5, { message: 'Название книги - не менее 5 символов!' })
  @MaxLength(100, {message: 'Название книги - не более 50 символов!'})
  @IsString()
  readonly author: string;
  
  @IsOptional()
  readonly year?: number;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  readonly images?: string[];

  @IsOptional()
  readonly totalCopies?: number;

  @IsOptional()
  readonly availableCopies?: number;
}
