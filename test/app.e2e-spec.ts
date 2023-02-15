import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/users/dto/users.create.dto';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('UsersController E2e TESTS', () => {
  let app: INestApplication;

  const user: CreateUserDto = {
    name: 'neto',
    email: 'emailMuitoDificlQueOutraPessoaTenha@gmail.com',
    password: '123',
  };

  let token: string;

  beforeEach(async () => {
    console.log(process.env.DB_DATABASE);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create a user', () => {
    return request(app.getHttpServer())
      .post('/users/sign-up')
      .send(user)
      .expect(201);
  });

  it('Login', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send(user);
    token = response.body.access_token;

    expect(response.status).toBe(200);
  });

  it('Delete', () => {
    console.log(token);
    return request(app.getHttpServer())
      .delete('/users/')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
