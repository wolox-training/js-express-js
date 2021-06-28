const { getRandomJoke, saveWeet, getWeets } = require('../services/weets');
const { newWeet } = require('../mappers/weets');
const { weetBasicSerializer, listWeets } = require('../serializers/weets');
const { characterLimitWeet } = require('../constants');
const logger = require('../logger');
const { defaultError } = require('../errors');

exports.createWeet = async (req, res) => {
  try {
    const { user } = req.headers;
    const content = await getRandomJoke();
    if (content.joke.length > characterLimitWeet) throw defaultError('The weet could not be created');
    const weet = await saveWeet(newWeet(content.joke, user));
    res.status(200).send(weetBasicSerializer(weet));
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getWeets = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const weets = await getWeets(limit, page);
    weets.rows = listWeets(weets.rows);
    res.status(200).send(weets);
  } catch (err) {
    logger.error(err);
    res.status(400).send(err);
  }
};
