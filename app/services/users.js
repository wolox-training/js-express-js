const db = require('../models/index');

const logger = require('../logger');
const { databaseError, badRequest_Error } = require('../errors');

const { signUp, dataComplete, getUsers } = require('../serializers/users');
const { encryptar, comparePassword } = require('../helpers/utils');

exports.saveUser = async data => {
  try {
    data.password = encryptar(data.password);
    const newUser = await db.User.create(data);
    return signUp(newUser);
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(err.errors);
  }
};

exports.getAllUsers = async (size = 10, page = 0) => {
  try {
    const listUsers = await db.User.findAll({
      limit: size,
      offset: page * size
    });
    return getUsers(listUsers);
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(err.errors);
  }
};

exports.getUserByEmail = async email => {
  try {
    const user = await db.User.findOne({ where: { email } });
    return user ? dataComplete(user) : user;
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(err.errors);
  }
};

exports.verifyCredentials = async credentials => {
  try {
    const userData = await this.getUserByEmail(credentials.email);
    if (userData) {
      if (comparePassword(credentials.password, userData.user.password)) {
        return userData;
      }
      throw badRequest_Error('Wrong credentials');
    } else {
      throw badRequest_Error('Wrong credentials');
    }
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
