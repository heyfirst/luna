import config from '../config'
var initJaegerTracer = require('jaeger-client').initTracer

var conf = {
  'serviceName': config.projectName,
  'sampler': {
    'type': 'const',
    'param': 1
  },
  'reporter': {
    'logSpans': true
  }
}
var options = {
  'logger': {
    'info': function logInfo (msg) {
      console.log('INFO ', msg)
    },
    'error': function logError (msg) {
      console.log('ERROR', msg)
    }
  }
}

export default initJaegerTracer(conf, options)
