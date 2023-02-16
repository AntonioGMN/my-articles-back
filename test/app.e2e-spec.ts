import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/users/dto/users.create.dto';
import { CreateArticlesDto } from 'src/articles/dto/articles.create.dto';
import { useContainer } from 'class-validator';

describe('E2e TESTS', () => {
  let app: INestApplication;

  const user: CreateUserDto = {
    name: 'testeGuy',
    email: 'emailTest@gmail.com',
    password: '123',
  };

  let token: string;

  const article: CreateArticlesDto = {
    title: 'ótimo artigo',
    url: 'https://www.sonoticiaboa.com.br/2023/02/16/australia-oferece-bolsa-de-estudo-integral-para-estrangeiros-inscreva-se',
  };

  let completeArticle;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    await app.init();
  });

  it('Create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/sign-up')
      .send(user);

    expect(response.status).toBe(201);
  });

  it('Login', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send(user);

    token = response.text;

    expect(response.status).toBe(200);
  });

  it('Create Article', async () => {
    const response = await request(app.getHttpServer())
      .post('/articles/create')
      .send(article)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  it('Get Articles', async () => {
    const response = await request(app.getHttpServer())
      .get('/articles')
      .set('Authorization', `Bearer ${token}`);

    const receivedArticle = response.body[0];
    completeArticle = receivedArticle;

    expect(response.status).toBe(200);
    expect(article.title).toStrictEqual(receivedArticle.title);
  });

  it('Update Article', async () => {
    completeArticle.title = 'ótimo artigo atualizado';
    delete completeArticle.image;

    const updateResponse = await request(app.getHttpServer())
      .put('/articles')
      .send(completeArticle)
      .set('Authorization', `Bearer ${token}`);

    const getArticleResponse = await request(app.getHttpServer())
      .get('/articles')
      .set('Authorization', `Bearer ${token}`);

    const updatedArticle = getArticleResponse.body[0];
    delete updatedArticle.image;

    expect(updateResponse.status).toBe(200);
    expect(completeArticle).toStrictEqual(updatedArticle);
  });

  it('Refresh Token', async () => {
    const response = await request(app.getHttpServer())
      .put('/token/refresh')
      .send({ oldToken: token });

    token = response.text;

    expect(response.status).toBe(200);
  });

  it('Logout', async () => {
    const response = await request(app.getHttpServer())
      .delete('/users/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Post articles by crawller', async () => {
    jest.setTimeout(30000);

    const body = { url: 'https://devgo.com.br/' };
    const response = await request(app.getHttpServer())
      .post('/articles/crawler')
      .send(body)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  }, 30000);

  it('Delete User', async () => {
    await request(app.getHttpServer())
      .delete('/users/delete')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
