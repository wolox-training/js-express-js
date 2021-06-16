const { body, validationResult } = require('express-validator');

const { badRequest_Error, defaultError } = require('../../errors');
const logger = require('../../logger');

const { encryptar, regDomainWolox, regPasswordAlphaNumeric } = require('../../helpers/utils');

exports.schemaSignUp = [
  body('name', 'The name is required')
    .isString()
    .notEmpty()
    .exists(),
  body('last_name', 'The last name is required')
    .isString()
    .notEmpty()
    .exists(),
  body('email', 'The email must be from domain Wolox')
    .notEmpty()
    .exists()
    .matches(regDomainWolox),
  body('password', 'The password must be alphanumeric')
    .notEmpty()
    .exists()
    .matches(regPasswordAlphaNumeric)
];

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
