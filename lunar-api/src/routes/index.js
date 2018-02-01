import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.status(200).send({ status: '[LUNAR-API] API Server is running!' })
})


module.exports = router