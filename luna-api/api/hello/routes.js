const Router = require('express').Router
const router = Router()

router.get('/', async (req, res) => {
  res.status(200).send({
    text: `Hello!`
  })
})

router.post('/', async (req, res) => {
  res.status(200).send({
    text: `Hello!`
  })
})

module.exports = router
