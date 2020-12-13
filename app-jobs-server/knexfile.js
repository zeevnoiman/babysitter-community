// Update with your config settings.
const {postgresKey} = require('./src/config/keys')

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : 'localhost',
      database: 'babysitterApp',
      user: 'postgres',
      password: postgresKey  
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
