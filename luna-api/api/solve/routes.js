const Router = require('express').Router
const router = Router()

const SolveController = require('./controller')

router.get('/', async (req, res, next) => {
  res.status(200).send({
    text: `Hello!`
  })
})

router.post('/', async (req, res, next) => {
  res.status(200).send({
    text: `Hello!`
  })
})

router.post('/run-test', SolveController.runTest)
router.post('/submit', SolveController.submit)

module.exports = router
