const knex = require("../db/connection");

const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

const read = (review_id) => {
  return knex("reviews").where({ review_id }).first();
};

const update = (review_id, review) => {
  return knex("reviews")
    .where({ review_id })
    .update(review)
    .then(() => {
      return knex("reviews")
        .join("critics", "critics.critic_id", "reviews.critic_id")
        .where({ review_id })
        .then((reviews) => {
          return reviews.map(addCritic);
        })
        .then((reviews) => reviews[0]);
    });
};

const destroy = (review_id) => {
  return knex("reviews").where({ review_id }).del();
};

module.exports = {
  read,
  update,
  destroy,
};
