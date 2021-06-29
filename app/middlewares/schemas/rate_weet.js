const { body } = require('express-validator');
const { scores } = require('../../constants');

exports.schemaRateWeet = [
  body('range', 'The range is required and must be -1 or 1')
    .notEmpty()
    .exists()
    .isIn(Object.values(scores))
];
