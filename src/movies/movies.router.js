const router = require("express").Router({ mergeParams: true });
const moviesController = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(moviesController.list);

router.route("/:movieId").get(moviesController.read).all(methodNotAllowed);
router
  .route("/:movieId/theaters")
  .get(moviesController.moviesInTheaters)
  .all(methodNotAllowed);
router
  .route("/:movieId/reviews")
  .get(moviesController.movieReviews)
  .all(methodNotAllowed);

module.exports = router;
