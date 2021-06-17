const supertest = require('supertest');

const app = require('../../app');
const db = require('../../app/models/index');
const { userDataCorrectly, wrongPassword } = require('../factory/users');

const logger = require('../../app/logger');

describe('Users - Sign Up', () => {
  it('Response status 200 - User created correctly', async done => {
    const response = await supertest(app)
      .post('/users')
      .send(userDataCorrectly())
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    done();
  });

  it('Response status 400 - The password is incorrect ', async done => {
    const response = await supertest(app)
      .post('/users')
      .send(wrongPassword())
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
    done();
  });

  it('Response status 400 - Email in use ', done => {
    db.User.create(userDataCorrectly())
      .then(async () => {
        const response = await supertest(app)
          .post('/users')
          .send(userDataCorrectly())
          .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        done();
      })
      .catch(err => {
        logger.error(err.errors);
      });
  });

  it('Response status 400 -  The params are incomplete', async done => {
    const response = await supertest(app)
      .post('/users')
      .send({})
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
    done();
  });
});
