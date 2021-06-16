const { body, validationResult } = require('express-validator');

const { badRequest_Error, defaultError } = require('../../errors');
const logger = require('../../logger');

const { encryptar } = require('../../helpers/utils');

exports.validations = body(['name', 'last_name', 'email', 'password']).exists();

exports.verifyParamsRequire = (req, res, next) => {
  const errors = validationResult(req);
  logger.info(errors);
  if (errors.isEmpty()) {
    next();
  } else {
    logger.error('All params are required');
    res.status(400).send(badRequest_Error('All params are required'));
  }
};

exports.verifyEmail = (req, res, next) => {
  const { email } = req.body;
  const domainWolox = /^(([^<>()[\]\\,;:\s@”]+((@wolox)+\.(co))))$/;
  if (domainWolox.test(email)) {
    next();
  } else {
    logger.error('The email is invalid');
    res.status(400).send(badRequest_Error('The email is invalid'));
  }
};

exports.verifyPassword = (req, res, next) => {
  const { password } = req.body;
  //* The password must have numbers and letters/symbols
  const regPassword = /^(?=.*\d)(?=.*\D)/;
  if (regPassword.test(password) && password.length >= 8) {
    next();
  } else {
    logger.error('The password is invalid');
    res.status(400).send(badRequest_Error('The password is invalid'));
  }
};

exports.encryptPassword = (req, res, next) => {
  const { password } = req.body;
  try {
    req.body.password = encryptar(password);
    next();
  } catch (err) {
    logger.error(`${err}`);
    res.status(400).send(defaultError('The password could not encrypt'));
  }
};
