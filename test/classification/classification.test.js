const supertest = require('supertest');

const app = require('../../app');
const db = require('../../app/models/index');
const logger = require('../../app/logger');
const { encryptar } = require('../../app/helpers/utils');
const { userData } = require('../factory/users');
const { scores } = require('../../app/constants');

describe('Create classification', () => {
  let token = '';
  let weet = {};

  beforeEach(async () => {
    try {
      const data = userData();
      data.password = encryptar(data.password);
      const user = await db.User.create(data);
      const responseLogin = await supertest(app)
        .post('/users/sessions')
        .send(userData())
        .set('Accept', 'application/json');
      ({ token } = responseLogin.body);
      weet = await db.Weet.create({
        userId: user.id,
        content: 'Hello World'
      });
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 200 - Success', async done => {
    try {
      const response = await supertest(app)
        .post(`/weets/${weet.id}/ratings`)
        .send({ range: scores.POSITIVE })
        .set('Accept', 'application/json')
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(200);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 400 - Wrong range', async done => {
    try {
      const response = await supertest(app)
        .post(`/weets/${weet.id}/ratings`)
        .send({ range: 2 })
        .set('Accept', 'application/json')
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(400);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 400 - Weet do not exists', async done => {
    try {
      const response = await supertest(app)
        .post(`/weets/${3}/ratings`)
        .send({ range: scores.POSITIVE })
        .set('Accept', 'application/json')
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(400);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 401 - No authenticated', async done => {
    try {
      const response = await supertest(app)
        .post(`/weets/${weet.id}/ratings`)
        .send({ range: scores.POSITIVE })
        .set('Accept', 'application/json');
      expect(response.status).toBe(401);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });
});
