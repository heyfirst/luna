import config from '../config'
var initJaegerTracer = require('jaeger-client').initTracer

var conf = {
  serviceName: config.projectName,
  sampler: {
    type: 'const',
    param: 1
  },
  reporter: {
    logSpans: true
  }
}
var options = {
  logger: {
    info: function logInfo (msg) {
      console.log('INFO ', msg)
    },
    error: function logError (msg) {
      console.log('ERROR', msg)
    }
  }
}

const tracer = initJaegerTracer(conf, options)
// hook up nodejs process exit event
process.on('exit', () => {
  console.log('JEAGER: flush out remaining span')
  tracer.close()
})
// handle ctrl+c
process.on('SIGINT', () => {
  process.exit()
})

export default tracer
