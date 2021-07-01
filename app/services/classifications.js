const db = require('../models/index');

const logger = require('../logger');
const { databaseError } = require('../errors');

exports.getClassificationByUserWeet = async (ratingUserId, weetId) => {
  try {
    const classification = await db.Classification.findOne({
      where: {
        ratingUserId,
        weetId
      }
    });
    return classification;
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(err.errors);
  }
};

exports.getAllClassifications = async () => {
  try {
    const classifications = await db.Classification.findAll({
      include: ['weet', 'user']
    });
    return classifications;
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(err.errors);
  }
};

exports.getScoreFromUser = async userId => {
  try {
    const classifications = await this.getAllClassifications();
    const filterClassifications = classifications.filter(
      classification => classification.weet.userId === userId
    );
    const score = filterClassifications.reduce((a, b) => a + parseInt(b.score), 0);
    return score;
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(err.errors);
  }
};

exports.saveClassification = async (data, transaction) => {
  try {
    const classification = await db.Classification.create(data, {
      transaction
    });
    return classification;
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(err.errors);
  }
};

exports.updateClassificationById = async (id, data, transaction) => {
  try {
    const classificationUpdated = await db.Classification.update(data, {
      where: { id },
      returning: true,
      transaction
    });
    return classificationUpdated[1][0];
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(err.errors);
  }
};

exports.deleteClassificationById = async (id, transaction) => {
  try {
    await db.Classification.destroy({
      where: { id },
      returning: true,
      transaction
    });
  } catch (err) {
    logger.error(databaseError(err.errors));
    throw databaseError(err.errors);
  }
};
