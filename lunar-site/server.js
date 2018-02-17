const express = require('express')
const next = require('next')
const config = require('./config')

const dev = !config.isProduction
const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(config.port, (err) => {
      if (err) throw err
      console.log(`> Luxshop - SITE :: Ready at port ${config.port}.`)
    })
  })
