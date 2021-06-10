const axios = require('axios').default;

const logger = require('../logger');
const config = require('../../config').common.apiGeekJoke;

exports.getRandomJoke = async () => {
  try {
    const response = await axios({
      url: `${config.url}/api?format=json`,
      method: 'GET'
    });
    return response.data;
  } catch (error) {
    logger.error(error.message);
    return error.message;
  }
};
