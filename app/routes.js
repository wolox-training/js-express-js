// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { createUser } = require('./controllers/users');

const {
  validations,
  verifyParamsRequire,
  verifyEmail,
  verifyPassword,
  encryptPassword
} = require('./middlewares/users/verify_signs_up');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post(
    '/endpoint/post/users',
    [validations, verifyParamsRequire, verifyEmail, verifyPassword, encryptPassword],
    createUser
  );
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
