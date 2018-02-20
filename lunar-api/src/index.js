// --------------------
//    ENV FILE CONFIG
// --------------------
import config from './config'
// -----------------------
//   IMPORT DEPENDENCIES
// -----------------------
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import chalk from 'chalk'
import helmet from 'helmet'

import tracer from './utils/jeager'
import http from 'http'
import opentracing from 'opentracing'
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

  const span = tracer.startSpan('http_request')
  const opts = {
    host: 'google.com',
    method: 'GET',
    port: '80',
    path: '/'
  }
  http.request(opts, res => {
    res.setEncoding('utf8')
    res.on('error', err => {
      // assuming no retries, mark the span as failed
      span.setTag(opentracing.Tags.ERROR, true)
      span.log({ 'event': 'error', 'error.object': err, 'message': err.message, 'stack': err.stack })
      span.finish()
    })
    res.on('data', chunk => {
      span.log({ 'event': 'data_received', 'chunk_length': chunk.length })
    })
    res.on('end', () => {
      span.log({ 'event': 'request_end' })
      span.finish()
    })
  }).end()

  console.log(`${chalk.bgRed(` ${config.projectName} `)} READY ON http://localhost:${chalk.inverse(config.port)}`)
})

module.exports = server
