var appRoot = require('app-root-path')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf } = format

const errorFile = new transports.File({
  level: 'error',
  filename: `${appRoot}/logs/error.log`,
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false
})

const logFile = new transports.File({
  level: 'info',
  filename: `${appRoot}/logs/info.log`,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false
})

const consoleFormat = printf(info => {
  return `${info.timestamp} [${info.level}]: ${info.message}`
})

const consoleTransport = new transports.Console({
  format: combine(timestamp(), consoleFormat),
  colorize: true
})

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [errorFile, logFile],
  exitOnError: false
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(consoleTransport)
}

logger.stream = {
  write: (message, encoding) => {
    logger.info(message)
  }
}

module.exports = logger
