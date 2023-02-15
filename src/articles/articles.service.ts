import { Inject, Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { ResponseDto } from '../dto/response.dto';
import { Repository } from 'typeorm';
import { CreateArticlesDto } from './dto/articles.create.dto';
import { Articles } from './articles.entity';
import urlMetadata from 'url-metadata';
import { UsersService } from '../users/users.service';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('ARTICLES_REPOSITORY')
    private articlesRepository: Repository<Articles>,
    private userService: UsersService,
  ) {}

  async getByUser(userEmail: string) {
    const user = await this.userService.findOne(userEmail);

    try {
      const articles = await this.articlesRepository.find({
        relations: { user: true },
        where: { user: user },
      });

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
      const user = await this.userService.findOne(article.userEmail);

      delete article.userEmail;
      const newArticle = this.articlesRepository.create({
        ...article,
        user: user,
      });
      await this.articlesRepository.save(newArticle);

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

  async update(article: CreateArticlesDto): Promise<ResponseDto> {
    try {
      const response = await this.articlesRepository.update(
        article.id,
        article,
      );
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

  async crawler(url: string) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      await page.$eval('header', (h) => h.remove());
      await page.$eval('footer', (h) => h.remove());

      let links = await page.$$eval('article a', (as) => as.map((a) => a.href));
      if (links.length === 0)
        links = await page.$$eval('h1 a', (as) => as.map((a) => a.href));

      links = links.filter((x, i) => links.indexOf(x) === i);
      browser.close();

      return links;
    } catch (err) {
      return err;
    }
  }

  async postCrawler({ userEmail, url }) {
    try {
      const links = await this.crawler(url);

      const articles = await Promise.all(
        links.map(async (l) => {
          const { title } = await urlMetadata(l);

          return { url: l, title };
        }),
      );

      const user = await this.userService.findOne(userEmail);

      await Promise.all(
        articles.map(async (ar) => {
          await this.articlesRepository.save({ ...ar, user });
        }),
      );

      return;
    } catch (err) {
      return <ResponseDto>{
        status: false,
        mensage: err,
      };
    }
  }
}
