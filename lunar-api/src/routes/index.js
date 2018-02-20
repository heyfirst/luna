import config from '../config'
import tracer from '../utils/jeager'
import axios from '../utils/axios'
import { Router } from 'express'
import * as CompilerController from '../controllers/CompilerController'

const router = Router()

router.get('/', async (req, res) => {
  const span = tracer.startSpan('get_index_from_java_judger')
  const data = await axios.request('get', 'http://localhost:3020', {}, {}, span).then(data => data.data)

  res.status(200).send({
    status: `[${config.projectName}] API Server is running!`,
    data
  })
})

router.post('/compile', CompilerController.sendCompile)

module.exports = router
