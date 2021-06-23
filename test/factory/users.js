const faker = require('faker');

const { roles } = require('../../app/constants');

exports.userData = () => {
  const dummyUser = {
    name: faker.name.findName(),
    last_name: faker.name.lastName(),
    email: 'dummy.user@wolox.co',
    password: 'Wolox2021'
  };
  return dummyUser;
};

exports.userAdminInitial = () => {
  const dummyUserAdmin = this.userData();
  dummyUserAdmin.email = 'user.admin@wolox.co';
  dummyUserAdmin.role = roles.ADMIN;
  return dummyUserAdmin;
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
