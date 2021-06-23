const logger = require('../logger');
const { signUp, signIn } = require('../mappers/users');
const { dataBasic, listUsers } = require('../serializers/users');

const { roles } = require('../constants');

const {
  saveUser,
  verifyCredentials,
  getUserByEmail,
  getAllUsers,
  updateUserByEmail
} = require('../services/users');
const { createToken } = require('../helpers/jwt');

exports.createUser = async (req, res) => {
  try {
    const response = await saveUser(signUp(req.body));
    res.status(200).send(dataBasic(response));
  } catch (err) {
    logger.error(err);
    res.status(400).send(err);
  }
};

exports.createUserAdmin = async (req, res) => {
  try {
    let response = {};
    const dataNewUser = signUp(req.body);
    const user = await getUserByEmail(dataNewUser.email);
    if (user) {
      response = await updateUserByEmail(user.email, { role: roles.ADMIN });
      logger.info('User updated to Admin');
      res.status(200).send(dataBasic(response));
    } else {
      dataNewUser.role = roles.ADMIN;
      response = await saveUser(dataNewUser);
      logger.info('User created like Admin');
      res.status(200).send(dataBasic(response));
    }
  } catch (err) {
    logger.error(err);
    res.status(400).send(err);
  }
};

exports.signInUser = async (req, res) => {
  try {
    const dataUser = await verifyCredentials(signIn(req.body));
    const token = createToken(dataUser);
    res.status(200).send({ token });
  } catch (err) {
    logger.error(err);
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
    logger.error(err);
    res.status(400).send(err);
  }
};
