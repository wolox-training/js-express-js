const axios = require('axios').default;

const logger = require('../logger');
const config = require('../../config');
const { externalApiError } = require('../errors');

exports.getRandomJoke = async () => {
  try {
    const response = await axios({
      url: `${config.common.apiGeekJoke}/api?format=json`,
      method: 'GET'
    });
    return response.data;
  } catch (error) {
    logger.error('Error getting random joke');
    throw externalApiError('Error getting random joke');
  }
};
