import express from 'express';
import bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import { GlobalErrorHandler } from '../middleware/globalErrorHandler';
import { UserController } from './user.controller';
import { MeetingController } from './meeting.controller';

import request from 'supertest';
let server;
describe('Test user controller', () => {

  beforeAll(async () => {
    server = express();
    server.use(bodyParser.json());
    useExpressServer(server, {
      controllers: [UserController, MeetingController],
      middlewares: [GlobalErrorHandler],
      defaultErrorHandler: false
    });
  });

  it('check  coorect login', async () => {
    const res = await request(server)
      .post('/users/login')
      .send({
        email: '10@gmail.com',
        password: '10@gmail.com'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userId');

  });
  it('check  incorrect password', async () => {
    const res = await request(server)
      .post('/users/login')
      .send({
        email: '10@gmail.com',
        password: '10'
      });
    expect(res.statusCode).toEqual(421);
    expect(res.body.detail).toEqual('Incorrect password');

  });

  it('check  unknown user', async () => {
    const res = await request(server)
      .post('/users/login')
      .send({
        email: '10@gmsfefwfwail.com',
        password: '10'
      });
    expect(res.statusCode).toEqual(420);
    expect(res.body.detail).toEqual('Unknown user e-mail');

  });

});
