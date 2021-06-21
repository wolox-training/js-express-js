// const controller = require('./controllers/controller');

const { schemaSignUp } = require('./middlewares/schemas/signs_up');
const { schemaSignIn } = require('./middlewares/schemas/signs_in');

const { validationSchema } = require('./middlewares/verify_signs_up');
const { validationSchemaSingIn } = require('./middlewares/verify_signs_in');

const { healthCheck } = require('./controllers/healthCheck');
const { createUser, signInUser, getUsers } = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', getUsers);
  app.post('/users', [schemaSignUp, validationSchema], createUser);
  app.post('/users/sessions', [schemaSignIn, validationSchemaSingIn], signInUser);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
