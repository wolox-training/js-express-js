const { signUp, signIn } = require('../mappers/users');

const { saveUser, verifyCredentials, getAllUsers } = require('../services/users');
const { createToken } = require('../helpers/jwt');

exports.createUser = async (req, res) => {
  try {
    const dataUser = signUp(req.body);
    const response = await saveUser(dataUser);
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.signInUser = async (req, res) => {
  try {
    const dataUser = await verifyCredentials(signIn(req.body));
    const token = createToken(dataUser.user);
    res.status(200).send({ token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};
