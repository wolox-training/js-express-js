const supertest = require('supertest');

const app = require('../../app');

const logger = require('../../app/logger');

describe('Weets - Create', () => {
  it('Response 401 - Unauthorizated', async done => {
    try {
      const response = await supertest(app)
        .post('/weets')
        .set('Accept', 'application/json');
      expect(response.status).toBe(401);
      done();
    } catch (err) {
      logger.error(err.errors);
    }
  });
});
