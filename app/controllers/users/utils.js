const bcrypt = require('bcryptjs');

exports.encryptar = password =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (errGenSalt, salt) => {
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
