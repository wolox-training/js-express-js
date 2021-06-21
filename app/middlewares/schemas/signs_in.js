const { body } = require('express-validator');

const { regDomainWolox } = require('../../constants');

exports.schemaSignIn = [
  body('email', 'The email must be from domain Wolox')
    .notEmpty()
    .exists()
    .matches(regDomainWolox),
  body('password', 'The password is required')
    .notEmpty()
    .exists()
];
