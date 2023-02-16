import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Put,
  Body,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { ArticlesService } from './articles.service';
import { CreateArticlesDto } from './dto/articles.create.dto';

@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  async getByUserId(@Req() req) {
    const { email } = req.user;
    return this.articlesService.getByUser(email);
  }

  @Post('/create')
  async create(@Req() req, @Res() res) {
    const userEmail = req.user.email;
    const linkData: CreateArticlesDto = req.body;
    await this.articlesService.create(linkData, userEmail);
    return res.sendStatus(HttpStatus.CREATED);
  }

  @Put()
  async update(@Body() body) {
    return await this.articlesService.update(body);
  }

  @Post('/crawler')
  async crawler(@Req() req, @Res() res) {
    const articls = await this.articlesService.postCrawler({
      userEmail: req.user.email,
      url: req.body.url,
    });
    return res.status(HttpStatus.CREATED).send(articls);
  }
}
