const supertest = require('supertest');

const app = require('../../app');
const db = require('../../app/models/index');
const logger = require('../../app/logger');

const { userData } = require('../factory/users');
const { weetData } = require('../factory/weets');
const { encryptar } = require('../../app/helpers/utils');

describe('Get all weets', () => {
  let token = '';
  beforeEach(async () => {
    try {
      const dataUser = userData();
      dataUser.password = encryptar(dataUser.password);
      const user = await db.User.create(dataUser);
      await db.Weet.create(weetData(user));
      const responseLogin = await supertest(app)
        .post('/users/sessions')
        .send(userData())
        .set('Accept', 'application/json');
      ({ token } = responseLogin.body);
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 200 - Get weets success', async done => {
    try {
      const response = await supertest(app)
        .get('/weets')
        .set('Accept', 'application/json')
        .query({ limit: '3', page: '0' })
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(200);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 400 - Limit required', async done => {
    try {
      const response = await supertest(app)
        .get('/weets')
        .set('Accept', 'application/json')
        .query({ page: '0' })
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(400);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 400 - Page required', async done => {
    try {
      const response = await supertest(app)
        .get('/weets')
        .set('Accept', 'application/json')
        .query({ limit: '3' })
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(400);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });
});
