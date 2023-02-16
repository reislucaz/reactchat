import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const data = {
    name: 'Teste',
    login: Date.now().toString(),
    password: 'teste',
  };

  it('should register a new user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(data)
      .expect(201);
  });

  it('should login a user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: data.login, password: data.password })
      .expect(201);
  });
});
