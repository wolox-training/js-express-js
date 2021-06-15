const db = require('../models/index');
const logger = require('../logger');

const { databaseError } = require('../errors');

exports.createUser = (req, res) => {
  const { name, lastName, email, password } = req.body;
  db.User.create({ name, lastName, email, password })
    .then(response => res.status(200).send(`${response.name}, your account was created correctly`))
    .catch(err => {
      logger.error(databaseError(err.errors));
      res.status(400).send(databaseError(err.errors));
    });
};
