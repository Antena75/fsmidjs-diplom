import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email является обязательным полем' })
  @IsEmail(undefined, {
    message: 'Email введён некорректно',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'Пароль является обязательным полем' })
  @IsString()
  @MinLength(6, { message: 'Пароль - не менее 6 символов!' })
  readonly password: string;
}
