const faker = require('faker');

exports.userDataCorrectly = () => {
  const dummyUser = {
    name: faker.name.findName(),
    last_name: faker.name.lastName(),
    email: 'dummy.user@wolox.co',
    password: faker.internet.password()
  };
  return dummyUser;
};

exports.wrongPassword = () => {
  const dummyUser = this.userDataCorrectly();
  dummyUser.password = 'password';
  return dummyUser;
};
