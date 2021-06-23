const supertest = require('supertest');

const app = require('../../app');
const db = require('../../app/models/index');

const logger = require('../../app/logger');
const { userAdminInitial, userData } = require('../factory/users');
const { encryptar } = require('../../app/helpers/utils');

describe('Users - Sign Up Admin', () => {
  let token = '';

  beforeEach(async () => {
    try {
      const data = userAdminInitial();
      data.password = encryptar(data.password);
      await db.User.create(data);

      const responseLogin = await supertest(app)
        .post('/users/sessions')
        .send(userAdminInitial())
        .set('Accept', 'application/json');
      ({ token } = responseLogin.body);
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 200 - User Admin created correctly', async done => {
    try {
      const response = await supertest(app)
        .post('/admin/users')
        .send(userData())
        .set('Accept', 'application/json')
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(200);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 200 - User Regular Update to Admin correctly', async done => {
    try {
      await db.User.create(userData());
      const response = await supertest(app)
        .post('/admin/users')
        .send(userData())
        .set('Accept', 'application/json')
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(200);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 401 - Do not have privileges', async done => {
    try {
      const response = await supertest(app)
        .post('/admin/users')
        .send(userData())
        .set('Accept', 'application/json');
      expect(response.status).toBe(401);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });
});
