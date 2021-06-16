const { signUp } = require('../mappers/users');
const { saveUser } = require('../services/users');

exports.createUser = (req, res) => {
  const dataUser = signUp(req.body);
  saveUser(dataUser)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(400).send(err));
};