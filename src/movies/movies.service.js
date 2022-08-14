const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

const list = () => {
  return knex("movies").select("*");
};

const listShowing = () => {
  return knex("movies_theaters")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .distinct("movies.*")
    .where("movies_theaters.is_showing", true);
};

const read = (movie_id) => {
  return knex("movies").where({ movie_id }).first();
};

const moviesInTheaters = (movie_id) => {
  return knex("movies_theaters")
    .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
    .where({ movie_id })
    .select("theaters.*");
};

const movieReviews = (movie_id) => {
  return knex("reviews")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .where({ movie_id })
    .then((movies) => {
      return movies.map(addCritic);
    });
};

module.exports = {
  list,
  listShowing,
  moviesInTheaters,
  movieReviews,
  read,
};
