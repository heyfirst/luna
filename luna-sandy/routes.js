const Router = require('express').Router
const router = Router()

// const STATUS = ['PASS', 'FAIL', 'COMPILED_ERROR']

router.get('/', async (req, res) => {
  res.status(200).send({
    status: `[${process.env.PROJECT_NAME}] API Server is running!`
  })
})

router.post('/run', (req, res, next) => {
  res.status(200).send({
    status: 'PASS',
    result: [
      {
        testcaseID: 1,
        output: '3',
        status: 'PASS'
      }
    ]
  })
})

module.exports = router
