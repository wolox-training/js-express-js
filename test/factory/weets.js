const faker = require('faker');

exports.weetData = user => ({
  userId: user.id,
  content: faker.lorem.sentence()
});
