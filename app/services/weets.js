const axios = require('axios').default;

const logger = require('../logger');
const config = require('../../config');
const { externalApiError, databaseError } = require('../errors');
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

exports.getWeetById = async id => {
  try {
    const weet = await db.Weet.findOne({
      where: { id },
      include: ['user']
    });
    return weet;
  } catch (err) {
    logger.error(err);
    throw databaseError(err);
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
