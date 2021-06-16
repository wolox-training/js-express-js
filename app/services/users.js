const db = require('../models/index');
const logger = require('../logger');
const { databaseError } = require('../errors');

exports.saveUser = async data => {
  try {
    const newUser = await db.User.create(data);
    return `${newUser.name}, your account was created correctly`;
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(err.errors);
  }
};
