exports.regDomainWolox = /^(([^<>()[\]\\,;:\s@”]+((@wolox)+\.(co))))$/;
exports.regPasswordAlphaNumeric = /^(?=.*\d)(?=.*\D)/;

exports.expiresIn = 30 * 30;

exports.roles = {
  REGULAR: 'REGULAR',
  ADMIN: 'ADMIN'
};

exports.scores = {
  POSITIVE: '1',
  NEGATIVE: '-1'
};

exports.positions = {
  DEVELOPER: 'DEVELOPER',
  LEAD: 'LEAD',
  TL: 'TL',
  EM: 'EM',
  HEAD: 'HEAD',
  CEO: 'CEO'
};
