exports.regDomainWolox = /^(([^<>()[\]\\,;:\s@”]+((@wolox)+\.(co))))$/;
exports.regPasswordAlphaNumeric = /^(?=.*\d)(?=.*\D)/;

exports.expiresIn = 30 * 30;

exports.roles = {
  REGULAR: 'REGULAR',
  ADMIN: 'ADMIN'
};
