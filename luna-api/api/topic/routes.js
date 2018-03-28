const Router = require('express').Router
const router = Router()

const TopicController = require('./controller')

router.get('/', TopicController.getAllTopics)
router.get('/:id', TopicController.getOneTopics)

module.exports = router
