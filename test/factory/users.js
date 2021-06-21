const faker = require('faker');

exports.userData = () => {
  const dummyUser = {
    name: faker.name.findName(),
    last_name: faker.name.lastName(),
    email: 'dummy.user@wolox.co',
    password: 'Wolox2021'
  };
  return dummyUser;
};

exports.wrongPassword = () => {
  const dummyUser = this.userData();
  dummyUser.password = 'password';
  return dummyUser;
};

exports.wrongEmail = () => {
  const dummyUser = this.userData();
  dummyUser.email = 'noemail@wolox.co';
  return dummyUser;
};
