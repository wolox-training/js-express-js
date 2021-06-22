const logger = require('../logger');

const { decodeToken } = require('../helpers/jwt');

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
