// const logger = require('pino')();

const axios = require('axios').default;

const ENVIRONMENT = process.env.NODE_ENV || 'development';
// eslint-disable-next-line global-require
if (ENVIRONMENT !== 'production') require('dotenv').config();

exports.getRandomJoke = async () => {
  try {
    const response = await axios({
      url: `${process.env.API_GEEK_JOKE}/api?format=json`,
      method: 'GET'
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
