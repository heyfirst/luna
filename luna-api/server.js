// --------------------
//    ENV FILE CONFIG
// --------------------
const config = require('./config')

// -----------------------
//   REQUIRE DEPENDENCY
// -----------------------
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk')
const helmet = require('helmet')

// ----------------------
//     INITIAL SERVER
// ----------------------
const server = express()
server.use(cors())
server.use(helmet())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// API V.1
const routes = require('./routes')
server.use('/', routes)

// LISTEN PORT 3001
const app = server.listen(config.port, (err) => {
  if (err) throw err
  console.log(`${chalk.bgRed(` ${config.projectName} `)} READY ON http://localhost:${chalk.inverse(config.port)}`)
})

module.exports = server
