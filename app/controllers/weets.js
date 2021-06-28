const { getRandomJoke, saveWeet } = require('../services/weets');
const { newWeet } = require('../mappers/weets');
const { weetBasicSerializer } = require('../serializers/weets');
const { characterLimitWeet } = require('../constants');
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
