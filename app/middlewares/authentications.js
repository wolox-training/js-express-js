const logger = require('../logger');
const { unauthorizedError } = require('../errors');

const { decodeToken } = require('../helpers/jwt');

const { roleAdmin } = require('../constants');

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const dataToken = decodeToken(token);
    req.headers.user = dataToken;
    next();
  } catch (err) {
    logger.error(err);
    res.status(401).send(err);
  }
};

exports.roleAdmin = (req, res, next) => {
  try {
    const dataUser = req.headers.user;
    if (!dataUser.role || dataUser.role > roleAdmin) throw unauthorizedError('Do not have privileges');
    next();
  } catch (err) {
    logger.error(err);
    res.status(401).send(err);
  }
};
