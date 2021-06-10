const logger = require('pino')();
const bcrypt = require('bcryptjs');

exports.encryptar = password =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (errGenSalt, salt) => {
      if (errGenSalt) reject(errGenSalt);
      bcrypt.hash(password, salt, (errHash, hash) => {
        if (errHash) reject(errHash);
        logger.info(hash);
        resolve(hash);
      });
    });
  });

exports.verifyEmail = email => {
  const domainWolox = `${email} Hello`;
  return domainWolox;
};

exports.verifyPassword = email => {
  const domainWolox = `${email} Hello`;
  return domainWolox;
};
