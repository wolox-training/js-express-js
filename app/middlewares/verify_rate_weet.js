const { validationResult } = require('express-validator');

const { badRequest_Error } = require('../errors');
const logger = require('../logger');

exports.validationSchemaRateWeet = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    logger.error(errors.array());
    res.status(400).send(badRequest_Error(errors.array()));
  }
};
