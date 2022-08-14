const service = require("./reviews.service");

const read = (req, res, next) => {
  const { review } = res.locals;
  res.json({ data: review });
};

const update = async (req, res, next) => {
  const {
    review,
    newReview: { score, content },
  } = res.locals;

  const updated = {
    ...review,
    score,
    content,
  };

  const data = await service.update(review.review_id, updated);
  res.json({ data });
};

const destroy = async (req, res, next) => {
  const { review } = res.locals;
  const data = await service.destroy(review.review_id);
  res.status(204).json({ data });
};

const verifyReviewExist = async (req, res, next) => {
  const { reviewId } = req.params;
  const data = await service.read(reviewId);
  if (data) {
    res.locals.review = data;
    return next();
  }

  next({
    status: 404,
    message: `The review with ID ${reviewId} cannot be found`,
  });
};

const verifyBody = async (req, res, next) => {
  const { data } = req.body;
  res.locals.newReview = data;
  next();
};

module.exports = {
  get: [verifyReviewExist, read],
  update: [verifyReviewExist, verifyBody, update],
  delete: [verifyReviewExist, destroy],
};
