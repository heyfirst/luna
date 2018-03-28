const Router = require('express').Router
const router = Router()

const TopicController = require('./controller')

router.get('/', TopicController.getAllTopics)
router.get('/1', TopicController.getOneTopics)

module.exports = router
