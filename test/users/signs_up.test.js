const faker = require('faker');
const supertest = require('supertest');

const app = require('../../app');
const db = require('../../app/models/index');
const logger = require('../../app/logger');

describe('Users - Sign Up', () => {
  beforeEach(() => {
    const data = {
      name: faker.name.findName(),
      last_name: faker.name.lastName(),
      email: 'first.user@wolox.co',
      password: faker.internet.password()
    };
    db.User.create(data)
      .then()
      .catch(err => {
        logger.error(err.errors);
      });
  });

  it('Response status 200 - User created correctly', async done => {
    const data = {
      name: faker.name.findName(),
      last_name: faker.name.lastName(),
      email: 'new.user@wolox.co',
      password: faker.internet.password()
    };
    const response = await supertest(app)
      .post('/endpoint/post/users')
      .send(data)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    done();
  });

  it('Response status 400 - The password is incorrect ', async done => {
    const data = {
      name: faker.name.findName(),
      last_name: faker.name.lastName(),
      email: 'first.user@wolox.co',
      password: 'password'
    };
    const response = await supertest(app)
      .post('/endpoint/post/users')
      .send(data)
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
    done();
  });

  it('Response status 400 - Email in use ', async done => {
    const data = {
      name: faker.name.findName(),
      last_name: faker.name.lastName(),
      email: 'first.user@wolox.co',
      password: faker.internet.password()
    };
    const response = await supertest(app)
      .post('/endpoint/post/users')
      .send(data)
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
    done();
  });

  it('Response status 400 -  The params are incomplete', async done => {
    const data = {};
    const response = await supertest(app)
      .post('/endpoint/post/users')
      .send(data)
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
    done();
  });
});
