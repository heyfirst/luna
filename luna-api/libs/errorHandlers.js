const logger = require('./logger')
const Status = require('http-status')

/* istanbul ignore next */
module.exports = (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // add this line to include winston logging
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  )

  res.status(Status.INTERNAL_SERVER_ERROR).json({
    type: 'InternalServerError',
    message: 'The server failed to handle this request'
  })
}
