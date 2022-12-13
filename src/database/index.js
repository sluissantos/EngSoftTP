import connectionDB from "../../knexfile.js";
const knex = require("knex")(connectionDB.development);

var cachedConnection;

export const getDatabaseConnector = () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  cachedConnection = knex;
  return cachedConnection;
};

module.exports = getDatabaseConnector();
