exports.newClassification = (user, params, body) => ({
  ratingUserId: user.id,
  weetId: parseInt(params.id),
  score: body.range
});
