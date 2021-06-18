const db = require('../models/index');

const logger = require('../logger');
const { databaseError, badRequest_Error } = require('../errors');

const { signUp } = require('../serializers/users');
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

exports.verifyCredentials = async (email, password) => {
  try {
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      if (comparePassword(password, user.password)) {
        return signUp(user);
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
