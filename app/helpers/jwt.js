const jwt = require('jsonwebtoken');

const config = require('../../config');
const { expiresIn } = require('../constants');
const { dataJWT } = require('../serializers/users');

const logger = require('../logger');
const { defaultError } = require('../errors');

exports.createToken = data => {
  try {
    const token = jwt.sign(dataJWT(data), config.common.seedToken, { expiresIn });
    return token;
  } catch (err) {
    logger.error(err);
    throw defaultError(err);
  }
};
