const db = require('../models/index');

const logger = require('../logger');
const { databaseError } = require('../errors');

const { signUp, getUsers } = require('../serializers/users');
const { encryptar } = require('../helpers/utils');

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

exports.getAllUsers = async () => {
  try {
    const listUsers = await db.User.findAll();
    return getUsers(listUsers);
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(err.errors);
  }
};
