import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('URL Shortener (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create short URL with unique alias', async () => {
    const res = await request(app.getHttpServer())
      .post('/shorten')
      .send({
        originalUrl: 'https://example.com',
        alias: 'uniquealias123',
      })
      .expect(201);

    expect(res.body).toHaveProperty('shortCode', 'uniquealias123');
    expect(res.body).toHaveProperty('originalUrl', 'https://example.com');
  });

  it('should redirect to original URL when accessing short URL', async () => {
    await request(app.getHttpServer())
      .post('/shorten')
      .send({
        originalUrl: 'https://example.com/redirect',
        alias: 'redirecttest',
      })
      .expect(201);

    const res = await request(app.getHttpServer())
      .get('/redirecttest')
      .expect(302);

    expect(res.header['location']).toBe('https://example.com/redirect');
  });

  afterAll(async () => {
    await app.close();
  });
});
