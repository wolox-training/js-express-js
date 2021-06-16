const bcrypt = require('bcryptjs');

const config = require('../../config');
const logger = require('../logger');
const { defaultError } = require('../errors');

exports.regDomainWolox = /^(([^<>()[\]\\,;:\s@”]+((@wolox)+\.(co))))$/;
exports.regPasswordAlphaNumeric = /^(?=.*\d)(?=.*\D)/;

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
