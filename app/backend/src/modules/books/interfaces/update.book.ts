import { IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly author?: string;
  
  @IsOptional()
  @IsString()
  readonly year?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  readonly images?: Express.Multer.File[] | string[];

  @IsOptional()
  @IsString()
  readonly totalCopies?: string;

  @IsOptional()
  @IsString()
  readonly availableCopies?: string;
}
