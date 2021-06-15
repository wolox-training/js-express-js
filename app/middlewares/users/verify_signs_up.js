const { badRequest_Error, defaultError } = require('../../errors');
const logger = require('../../logger');

const { encryptar } = require('../../helpers/utils');

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
  encryptar(password)
    .then(newPassword => {
      req.body.password = newPassword;
      next();
    })
    .catch(err => {
      logger.error(`${err}`);
      res.status(400).send(defaultError('The password could not encrypt'));
    });
};
