const knex = require('knex')
const config = require('config')

const knexconfig = {
  client: 'mysql',
  connection: {
    host: config.get('DB_host'),
    user: config.get('DB_user'),
    password: config.get('DB_password'),
    database: config.get('DB_database')
  }
}

module.exports = knex(knexconfig)
