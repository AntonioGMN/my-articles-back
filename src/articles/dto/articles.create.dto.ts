import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

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
