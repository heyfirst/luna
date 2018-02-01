// --------------------
//    ENV FILE CONFIG
// --------------------
require('dotenv').config()
// -----------------------
//   IMPORT DEPENDENCIES
// -----------------------
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import chalk from 'chalk'
// ----------------------
//     INITIAL SERVER
// ----------------------
const server = express()
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// API V.1
const routes = require('./routes')
server.use('/', routes)

// LISTEN PORT 3001
const app = server.listen(process.env.PORT, (err) => {
  if (err) throw err
  console.log(`${chalk.bgRed(' LUNAR-API ')} READY ON http://localhost:${chalk.inverse(process.env.PORT)}`)
})

module.exports = server