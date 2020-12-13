var knex = require('knex')
const knexPostgis = require("knex-postgis");


const {postgresKey} = require('../config/keys')


const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      database: 'babysitterApp',
      user: 'postgres',
      password: postgresKey
    },
    useNullAsDefault: true
  });

  const st = knexPostgis(db);

  module.exports = db;