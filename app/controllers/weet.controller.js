const { getRandomJoke } = require('../services/geek_jokes');

exports.createWeet = (_, res) => {
  getRandomJoke()
    .then(response => res.status(200).send({ weet: response.joke }))
    .catch(err => res.status(500).send({ error: err }));
};
