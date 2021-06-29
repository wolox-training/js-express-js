const { body, param } = require('express-validator');

const { scores } = require('../../constants');
const { getWeetById } = require('../../services/weets');

exports.schemaRateWeet = [
  body('range', 'The range is required and must be -1 or 1')
    .notEmpty()
    .exists()
    .isIn(Object.values(scores)),
  param('id', 'The weet do not exists').custom(async value => {
    const weet = await getWeetById(value);
    if (!weet) return Promise.reject(new Error('The weet do not exists'));
    return true;
  })
];
