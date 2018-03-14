import config from '../config'
import { Router } from 'express'
import tracer from '../utils/jeager'
import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing'
import * as CompilerController from '../controllers/CompilerController'

const router = Router()

router.get('/', (req, res) => {
  const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers)
  const span = tracer.startSpan('http_server', {
    childOf: parentSpanContext,
    tags: { [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER }
  })
  span.log({
    'event': 'retreive_request_from_api'
  })

  setTimeout(() => {
    res.status(200).send({ status: `[${config.projectName}] API Server is running!` })
    span.finish()
  }, 500)
})

router.post('/compile', CompilerController.sendCompile)

module.exports = router
