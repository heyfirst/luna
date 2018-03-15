const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()

const config = require('./src/config')
const cors = require('cors')
const chalk = require('chalk')
const helmet = require('helmet')

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))
app.use(cors())
app.use(helmet())
// Serve static assets
app.use(express.static(path.resolve(__dirname, '.', 'build')))

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'build', 'index.html'))
})

app.listen(config.port, () => {
  console.log(`${chalk.bgRed(' LUNA-SITE ')} READY ON http://localhost:${chalk.inverse(config.port)}`)
})

module.exports = app
