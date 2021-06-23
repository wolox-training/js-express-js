const supertest = require('supertest');

const app = require('../../app');
const { userData, wrongPassword, wrongEmail } = require('../factory/users');

const logger = require('../../app/logger');

describe('Users - Sign In', () => {
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

  it('Response status 200 - Login success', async done => {
    try {
      const response = await supertest(app)
        .post('/users/sessions')
        .send({ email: userData().email, password: userData().password })
        .set('Accept', 'application/json');
      expect(response.status).toBe(200);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 400 - Email from another Domain', async done => {
    try {
      const response = await supertest(app)
        .post('/users/sessions')
        .send({ email: 'dummy.session@sad.co', password: 'Wolox2020' })
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 400 - Wrong email', async done => {
    try {
      const response = await supertest(app)
        .post('/users/sessions')
        .send({ email: wrongEmail().email, password: wrongEmail().password })
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });

  it('Response status 400 - Wrong password', async done => {
    try {
      const response = await supertest(app)
        .post('/users/sessions')
        .send({ email: wrongPassword().email, password: wrongPassword().password })
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });
});
