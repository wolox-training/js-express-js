// const controller = require('./controllers/controller');

const { schemaSignUp } = require('./middlewares/schemas/signs_up');
const { schemaSignIn } = require('./middlewares/schemas/signs_in');
const { schemaPagination } = require('./middlewares/schemas/paginations');

const { validationSchema } = require('./middlewares/verify_signs_up');
const { validationSchemaSingIn } = require('./middlewares/verify_signs_in');
const { verifyToken, roleAdmin } = require('./middlewares/authentications');
const { validationSchemaPagination } = require('./middlewares/verify_paginations');

const { healthCheck } = require('./controllers/healthCheck');
const { createUser, signInUser, getUsers, createUserAdmin } = require('./controllers/users');
const { createWeet, getWeets } = require('./controllers/weets');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', [verifyToken], getUsers);
  app.post('/users', [schemaSignUp, validationSchema], createUser);
  app.post('/users/sessions', [schemaSignIn, validationSchemaSingIn], signInUser);
  app.post('/admin/users', [verifyToken, roleAdmin, schemaSignIn, validationSchemaSingIn], createUserAdmin);
  app.get('/weets', [verifyToken, schemaPagination, validationSchemaPagination], getWeets);
  app.post('/weets', [verifyToken], createWeet);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
