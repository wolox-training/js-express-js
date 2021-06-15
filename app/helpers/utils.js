const bcrypt = require('bcryptjs');
const config = require('../../config');

exports.encryptar = password =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(parseInt(config.common.roundsBcrypt), (errGenSalt, salt) => {
      if (errGenSalt) reject(errGenSalt);
      bcrypt.hash(password, salt, (errHash, hash) => {
        if (errHash) reject(errHash);
        resolve(hash);
      });
    });
  });

exports.comparePassword = (password, hashPassword) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
