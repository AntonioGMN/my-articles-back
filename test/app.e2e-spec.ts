import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from 'src/users/dto/users.create.dto';

describe('UsersController E2e TESTS', () => {
  let app: INestApplication;

  const user: CreateUserDto = {
    name: 'neto',
    email: 'emailMuitoDificlQueOutraPessoaTenha@gmail.com',
    password: '123',
  };

  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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
