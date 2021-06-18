const jwt = require('jsonwebtoken');

const config = require('../../config');
const { expiresIn } = require('../constants');

const { signUp } = require('../mappers/users');
const { saveUser, verifyCredentials } = require('../services/users');

exports.createUser = (req, res) => {
  const dataUser = signUp(req.body);
  saveUser(dataUser)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(400).send(err));
};

exports.signInUser = (req, res) => {
  verifyCredentials(req.body.email, req.body.password)
    .then(response => {
      const Token = jwt.sign(
        {
          name: response.user.name,
          last_name: response.user.last_name
        },
        config.common.seedToken,
        { expiresIn }
      );
      res.status(200).send({ token: Token });
    })
    .catch(err => res.status(400).send(err));
};
