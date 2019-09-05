const knex = require("knex");

const knexConfig = require("../knexfile.js");

const environment = "development";

module.exports = knex(knexConfig[environment]);
