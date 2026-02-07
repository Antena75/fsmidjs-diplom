import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Email является обязательным полем' })
  @IsEmail(undefined, { message: 'Email введён некорректно' })
  readonly email: string;

  @IsNotEmpty({ message: 'Пароль является обязательным полем' })
  @IsString()
  @MinLength(6, { message: 'Пароль - не менее 6 символов!' })
  // @IsStrongPassword({
  //   minLength: 6,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // })
  readonly password: string;

  @IsNotEmpty({ message: 'Имя является обязательным полем' })
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString() 
  readonly contactPhone?: string;

  @IsOptional()
  @IsString()
  readonly role?: string;
}
