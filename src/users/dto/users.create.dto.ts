import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validations/uniqueEmail';

export class CreateUserDto {
  @IsNotEmpty()
  name?: string;

  @IsEmail()
  @EmailIsUnique({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @MinLength(6)
  password: string;
}
