const db = require('../models/index');
const logger = require('../logger');

const { databaseError } = require('../errors');
const { signUp } = require('../mappers/user.mapper');

exports.createUser = (req, res) => {
  const dataUser = signUp(req.body);
  db.User.create(dataUser)
    .then(response => res.status(200).send(`${response.name}, your account was created correctly`))
    .catch(err => {
      logger.error(databaseError(err.errors));
      res.status(400).send(databaseError(err.errors));
    });
};
