const config = require('config')
const Router = require('express').Router
const router = Router()

router.get('/', async (req, res) => {
  res.status(200).send({
    status: `[${config.projectName}] API Server is running!`
  })
})

router.get('/err', async (req, res, next) => {
  let err = new Error('Sample error')
  next(err)
})

module.exports = router
