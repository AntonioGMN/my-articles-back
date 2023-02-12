import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';
import { Users } from 'src/users/dto/users.entity';

export class CreateArticlesDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  userEmail: string;
}
