const { signUp, signIn } = require('../mappers/users');
const { dataBasic, listUsers } = require('../serializers/users');

const { saveUser, verifyCredentials, getAllUsers, saveUserAdmin } = require('../services/users');
const { createToken } = require('../helpers/jwt');

exports.createUser = async (req, res) => {
  try {
    const response = await saveUser(signUp(req.body));
    res.status(200).send(dataBasic(response));
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.createUserAdmin = async (req, res) => {
  try {
    const dataUser = await saveUserAdmin(signUp(req.body));
    res.status(200).send(dataBasic(dataUser));
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.signInUser = async (req, res) => {
  try {
    const dataUser = await verifyCredentials(signIn(req.body));
    const token = createToken(dataUser);
    res.status(200).send({ token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { size, page } = req.query;
    const users = await getAllUsers(size, page);
    users.rows = listUsers(users.rows);
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
};
