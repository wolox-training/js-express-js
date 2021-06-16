const { validationResult } = require('express-validator');

const { badRequest_Error, defaultError } = require('../errors');
const logger = require('../logger');

const { encryptar } = require('../helpers/utils');

exports.validationSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    logger.error(errors.array());
    res.status(400).send(badRequest_Error(errors.array()));
  }
};

exports.encryptPassword = (req, res, next) => {
  const { password } = req.body;
  try {
    req.body.password = encryptar(password);
    next();
  } catch (err) {
    logger.error(`${err}`);
    res.status(500).send(defaultError('The password could not encrypt'));
  }
};
