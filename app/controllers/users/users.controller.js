// const logger = require('pino')();
const db = require('../../models/index');

const { databaseError, badRequest_Error } = require('../../errors');
const { encryptar } = require('./utils');

exports.createUser = (req, res) => {
  const { name, last_name, email, password } = req.body;
  if (password.length < 8) {
    res.status(400).send(badRequest_Error('La contraseña debe tener minimo 8 caracteres'));
  } else {
    encryptar(password)
      .then(newPassword => {
        db.user
          .create({ name, last_name, email, newPassword })
          .then(response => res.status(200).send(`Sr(a) ${response.name}, su cuenta se creó correctamente`))
          .catch(err => res.status(400).send(databaseError(err.errors)));
      })
      .catch(err => res.status(500).send(err));
  }
};
