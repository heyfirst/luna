// --------------------
//    ENV FILE CONFIG
// --------------------
const config = require('config')

// -----------------------
//   REQUIRE DEPENDENCY
// -----------------------
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./utils/logger')
const errorHandlers = require('./utils/errorHandlers')
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
const app = server.listen(config.port, (err) => {
  if (err) throw err
  logger.info(`${chalk.bgRed(` ${config.projectName} `)} READY ON http://localhost:${chalk.inverse(config.port)}`)
})

module.exports = server
