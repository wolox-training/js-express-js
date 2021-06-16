// const controller = require('./controllers/controller');

const { schemaSignUp } = require('./middlewares/schemas/signs_up');

const { validationSchema } = require('./middlewares/verify_signs_up');

const { healthCheck } = require('./controllers/healthCheck');
const { createUser } = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/endpoint/post/users', [schemaSignUp, validationSchema], createUser);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
