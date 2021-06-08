// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { createWeet } = require('./controllers/weet.controller');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/weet', createWeet);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
