const config = require('../config')
const Router = require('express').Router
const router = Router()

router.get('/', async (req, res) => {
  res.status(200).send({
    status: `[${config.projectName}] API Server is running!`
  })
})

module.exports = router
