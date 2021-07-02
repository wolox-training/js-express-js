const { query } = require('express-validator');

exports.schemaPagination = [
  query('limit', 'The limit param is required')
    .notEmpty()
    .toInt()
    .exists(),
  query('page', 'The page param is required')
    .notEmpty()
    .toInt()
    .exists()
];
