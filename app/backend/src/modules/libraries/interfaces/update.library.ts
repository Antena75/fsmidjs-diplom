import { IsOptional, IsString } from 'class-validator';

export class UpdateLibraryDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  readonly images?: Express.Multer.File[] | string[];
}
