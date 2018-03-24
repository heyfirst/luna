const Router = require('express').Router
const router = Router()

const TaskController = require('./controller')

router.get('/', TaskController.getTasks)
router.get('/:id', TaskController.getTask)

module.exports = router
