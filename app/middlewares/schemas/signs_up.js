const { body } = require('express-validator');

const { regDomainWolox, regPasswordAlphaNumeric } = require('../../constants');

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
