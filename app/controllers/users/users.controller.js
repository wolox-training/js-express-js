const db = require('../../models/index');
const logger = require('../../logger');

const { databaseError } = require('../../errors');
const { encryptar } = require('./utils');

exports.createUser = (req, res) => {
  const { name, last_name, email, password } = req.body;
  encryptar(password)
    .then(newPassword => {
      db.user
        .create({ name, last_name, email, password: newPassword })
        .then(response => res.status(200).send(`${response.name}, your account was created correctly`))
        .catch(err => {
          logger.error(databaseError(err.errors));
          res.status(400).send(databaseError(err.errors));
        });
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send(err);
    });
};
