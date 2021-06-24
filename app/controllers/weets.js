const { getRandomJoke, saveWeet } = require('../services/weets');

const { newWeet } = require('../mappers/weets');
const { dataBasic } = require('../serializers/weets');

const { defaultError } = require('../errors');

exports.createWeet = async (req, res) => {
  try {
    const { user } = req.headers;
    const content = await getRandomJoke();
    if (content.joke.length > 140) throw defaultError('The weet could not be created');
    const weet = await saveWeet(newWeet(content.joke, user));
    res.status(200).send(dataBasic(weet));
  } catch (err) {
    res.status(400).send(err);
  }
};
