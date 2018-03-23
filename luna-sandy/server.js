// --------------------
//    ENV FILE CONFIG
// --------------------
require('dotenv').config()

// -----------------------
//   REQUIRE DEPENDENCY
// -----------------------
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./libs/logger')
const errorHandlers = require('./libs/errorHandlers')
// ----------------------
//     INITIAL SERVER
// ----------------------
const server = express()
server.use(cors())
server.use(helmet())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(morgan('combined', { stream: logger.stream }))

// API V.1
const routes = require('./routes')
server.use('/', routes)
server.use(errorHandlers)

// LISTEN PORT 3001
const app = server.listen(process.env.PORT, (err) => {
  if (err) throw err
  logger.info(`${chalk.bgRed(` ${process.env.PROJECT_NAME} `)} READY ON http://localhost:${chalk.inverse(process.env.PORT)}`)
})

module.exports = server
