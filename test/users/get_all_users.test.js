const supertest = require('supertest');

const app = require('../../app');
const { userData } = require('../factory/users');

const logger = require('../../app/logger');

describe('Users - get all', () => {
  beforeEach(async () => {
    try {
      await supertest(app)
        .post('/users')
        .send(userData())
        .set('Accept', 'application/json');
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 200 - Get all users correctly', async done => {
    try {
      const responseLogin = await supertest(app)
        .post('/users/sessions')
        .send(userData())
        .set('Accept', 'application/json');
      const responseUsers = await supertest(app)
        .get('/users/')
        .set('Accept', 'application/json')
        .auth(responseLogin.body.token, { type: 'bearer' });
      expect(responseUsers.status).toBe(200);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 401 - No authenticated', async done => {
    try {
      const responseUsers = await supertest(app)
        .get('/users/')
        .set('Accept', 'application/json');
      expect(responseUsers.status).toBe(401);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });
});
