const bcrypt = require('bcryptjs');

const config = require('../../config');
const logger = require('../logger');
const { defaultError } = require('../errors');

const { positions } = require('../constants');

exports.encryptar = password => {
  try {
    const salt = bcrypt.genSaltSync(parseInt(config.common.roundsBcrypt));
    const newPassword = bcrypt.hashSync(password, salt);
    return newPassword;
  } catch (err) {
    logger.error(err);
    throw defaultError(err);
  }
};

exports.comparePassword = (password, hashPassword) => {
  try {
    return bcrypt.compareSync(password, hashPassword);
  } catch (err) {
    logger.error(err);
    throw defaultError(err);
  }
};

exports.getPosition = score => {
  if (score < 6) return positions.DEVELOPER;
  else if (score < 10) return positions.LEAD;
  else if (score < 20) return positions.TL;
  else if (score < 30) return positions.EM;
  else if (score < 50) return positions.HEAD;
  return positions.CEO;
};
