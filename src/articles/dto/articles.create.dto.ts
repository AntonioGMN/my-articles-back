import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateArticlesDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;
}
