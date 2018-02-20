import { Router } from 'express'
import * as CompilerController from '../controllers/CompilerController'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).send({ status: '[LUNAR-API] API Server is running!' })
})

router.post('/compile', CompilerController.sendCompile)

module.exports = router
