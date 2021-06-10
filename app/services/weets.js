const axios = require('axios').default;

const logger = require('../logger');
const { externalApiError } = require('../errors');
const config = require('../../config');

exports.getRandomJoke = async () => {
  try {
    const response = await axios({
      url: `${config.common.apiGeekJoke}/api?format=json`,
      method: 'GET'
    });
    return response.data;
  } catch (error) {
    logger.error('Error getting random joke');
    return externalApiError('Error getting random joke');
  }
};
