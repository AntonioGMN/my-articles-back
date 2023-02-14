import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validations/uniqueEmail';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Email invalido' })
  @EmailIsUnique({ message: 'Já existe um usuário cadastrado com este e-mail' })
  email: string;

  @MinLength(3, { message: 'Senha precisa ter mais que 3 caracteres' })
  password: string;
}
