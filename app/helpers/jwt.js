const jwt = require('jsonwebtoken');

const config = require('../../config');
const { expiresIn } = require('../constants');
const { dataJWT } = require('../serializers/users');
const { dataJWTIn } = require('../mappers/users');

const logger = require('../logger');
const { defaultError, unauthorizedError } = require('../errors');

exports.createToken = data => {
  try {
    const token = jwt.sign(dataJWT(data), config.common.seedToken, { expiresIn });
    return token;
  } catch (err) {
    logger.error(err);
    throw defaultError(err);
  }
};

exports.decodeToken = token => {
  try {
    const decoded = jwt.verify(token, config.common.seedToken);
    return dataJWTIn(decoded);
  } catch (err) {
    logger.error(err);
    throw unauthorizedError(err.message);
  }
};
