import { Inject, Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { ResponseDto } from 'src/dto/response.dto';
import { Repository } from 'typeorm';
import { CreateArticlesDto } from './dto/articles.create.dto';
import { Articles } from './articles.entity';
import urlMetadata from 'url-metadata';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('ARTICLES_REPOSITORY')
    private articlesRepository: Repository<Articles>,
    private userService: UsersService,
  ) {}

  async get() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://blog.rocketseat.com.br/');

    await page.$eval('header', (h) => h.remove());
    await page.$eval('footer', (h) => h.remove());

    const hrefs = await page.$$eval('a', (as) => as.map((a) => a.href));

    await browser.close();

    return hrefs;
  }

  async getByUserId(userId) {
    try {
      const articles = await this.articlesRepository.find({
        relations: { user: true },
        where: { user: { id: userId } },
      });
      console.log(articles);
      const articlesWithMetaDates = Promise.all(
        articles.map(async (art) => {
          const { image } = await urlMetadata(art.url);
          return { ...art, image: image };
        }),
      );
      return articlesWithMetaDates;
    } catch (err) {
      return <ResponseDto>{
        status: false,
        mensage: err,
      };
    }
  }

  async create(article: CreateArticlesDto): Promise<ResponseDto> {
    try {
      console.log(article);
      const user = await this.userService.findOne(article.userEmail);

      delete article.userEmail;
      const r = await this.articlesRepository.save({ ...article, user });
      console.log(r);

      return <ResponseDto>{
        status: true,
        mensage: 'create',
      };
    } catch (err) {
      console.log(err);

      return <ResponseDto>{
        status: false,
        mensage: err,
      };
    }
  }

  async update(article: CreateArticlesDto): Promise<ResponseDto> {
    try {
      const response = await this.articlesRepository.update(
        article.id,
        article,
      );
      console.log(response);
      return <ResponseDto>{
        status: true,
        mensage: 'create',
      };
    } catch (err) {
      return <ResponseDto>{
        status: false,
        mensage: err,
      };
    }
  }
}
