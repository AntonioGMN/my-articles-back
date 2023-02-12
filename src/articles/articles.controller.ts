import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Put,
  Body,
} from '@nestjs/common';
import { constants } from 'buffer';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ArticlesService } from './articles.service';
import { CreateArticlesDto } from './dto/articles.create.dto';

@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  async getByUserId(@Req() req) {
    const { userId } = req.user;
    return this.articlesService.getByUserId(userId);
  }

  @Post('/create')
  async create(@Req() req) {
    console.log(req.user);
    const linkData: CreateArticlesDto = {
      userEmail: req.user.email,
      ...req.body,
    };
    return this.articlesService.create(linkData);
  }

  @Put()
  async update(@Body() body: CreateArticlesDto) {
    console.log('incial article ', body);
    return this.articlesService.update(body);
  }
}
