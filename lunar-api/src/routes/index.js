import config from '../config'
import tracer from '../utils/jeager'
import api from '../utils/api'
import { Router } from 'express'
import * as CompilerController from '../controllers/CompilerController'

const router = Router()

router.get('/', async (req, res) => {
  const span = tracer.startSpan('get_index_from_java_judger')
  const data = await api.request('get', 'http://localhost:3020', {}, {}, span).then(data => data.data)

  res.status(200).send({
    status: `[${config.projectName}] API Server is running!`,
    data
  })
})

router.post('/compile', CompilerController.sendCompile)

module.exports = router
