import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ArticlesService } from './articles.service';
import { CreateArticlesDto } from './dto/articles.create.dto';

@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  async getAll() {
    return this.articlesService.getAll();
  }

  @Post('/create')
  async create(@Req() req) {
    console.log('entrou');
    const linkData: CreateArticlesDto = { user: req.user.userId, ...req.body };
    return this.articlesService.create(linkData);
  }
}
