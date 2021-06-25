const axios = require('axios').default;

const logger = require('../logger');
const config = require('../../config');
const { externalApiError, databaseError } = require('../errors');
const { pagination } = require('../serializers/utils');

const db = require('../models/index');

exports.getRandomJoke = async () => {
  try {
    const response = await axios({
      url: `${config.common.apiGeekJoke}/api?format=json`,
      method: 'GET'
    });
    return response.data;
  } catch (err) {
    logger.error('Error getting random joke');
    throw externalApiError('Error getting random joke');
  }
};

exports.saveWeet = async data => {
  try {
    const newWeet = await db.Weet.create(data);
    return newWeet;
  } catch (err) {
    logger.error(err);
    throw databaseError(err);
  }
};

exports.getWeets = async (limit, page) => {
  try {
    const response = await db.Weet.findAndCountAll({
      limit,
      offset: page * limit,
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'name', 'lastName']
        }
      ]
    });
    return pagination(response.count, response.rows);
  } catch (err) {
    logger.error(err);
    throw databaseError(err);
  }
};
