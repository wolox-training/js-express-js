const db = require('../models/index');

const { getRandomJoke, saveWeet, getWeetById } = require('../services/weets');
const { updateUserByEmail } = require('../services/users');
const {
  getClassificationByUserWeet,
  saveClassification,
  updateClassificationById,
  deleteClassificationById,
  getScoreFromUser
} = require('../services/classifications');
const { newWeet } = require('../mappers/weets');
const { newClassification } = require('../mappers/classifications');
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

exports.rateWeet = async (req, res) => {
  let transaction = {};
  try {
    transaction = await db.sequelize.transaction();
    const dataClassification = newClassification(req.headers.user, req.params, req.body);
    const weet = await getWeetById(dataClassification.weetId);
    const classification = await getClassificationByUserWeet(
      dataClassification.ratingUserId,
      dataClassification.weetId
    );
    if (classification) {
      if (parseInt(classification.score) === dataClassification.score) {
        deleteClassificationById(classification.id, transaction);
      } else {
        updateClassificationById(classification.id, { score: dataClassification.score }, transaction);
      }
    } else {
      saveClassification(dataClassification, transaction);
    }
    const score = await getScoreFromUser(weet.user.id);
    const position = await weet.user.getPosition(score);
    await updateUserByEmail(weet.user.email, { position }, transaction);
    await transaction.commit();
    res.status(200).send({ status: true });
  } catch (err) {
    if (transaction.rollback) await transaction.rollback();
    res.status(400).send(err);
  }
};
