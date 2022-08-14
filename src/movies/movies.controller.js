const service = require("./movies.service");

const list = async (req, res, next) => {
  const { is_showing } = req.query;
  let data;
  if (is_showing === "true") {
    data = await service.listShowing();
  } else {
    data = await service.list();
  }
  res.json({ data });
};

const read = (req, res, next) => {
  const { movie } = res.locals;
  res.json({ data: movie });
};

const moviesInTheaters = async (req, res, next) => {
  const { movie } = res.locals;
  const data = await service.moviesInTheaters(movie.movie_id);
  res.json({ data });
};

const movieReviews = async (req, res, next) => {
  const { movie } = res.locals;
  const data = await service.movieReviews(movie.movie_id);
  res.json({ data });
};

const verifyMovieExists = async (req, res, next) => {
  const { movieId } = req.params;
  const data = await service.read(movieId);
  if (data) {
    res.locals.movie = data;
    return next();
  }
  next({
    status: 404,
    message: `The movie with ID ${movieId} was not found`,
  });
};

module.exports = {
  list,
  moviesInTheaters: [verifyMovieExists, moviesInTheaters],
  movieReviews: [verifyMovieExists, movieReviews],
  read: [verifyMovieExists, read],
};
