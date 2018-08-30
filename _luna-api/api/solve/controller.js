const taskModel = require('../tasks/model')
const axios = require('../../libs/axios')

module.exports = {
  runTest: async (req, res, next) => {
    try {
      // Get Task
      const task = await taskModel
        .getOne(req.body.taskID, false)

      // send to [Sandbox]
      const formData = {
        code: req.body.code,
        testcase: task.testcase
      }

      const result = await axios
        .post(`${process.env.SERVICE_SANDY_PATH}/run`, formData)
        .then(resp => resp.data.result)
        .catch(err => err)

      if (typeof result.err === 'undefined') {
        res.status(200).send({
          result
        })
        return
      }
      next(result.err)
    } catch (err) {
      next(err)
    }
  },
  submit: async (req, res, next) => {
    try {
      // Get Task
      const task = await taskModel
        .getOne(req.body.taskID, true)

      // send to [Sandbox]
      const formData = {
        code: req.body.code,
        testcase: task.testcase
      }

      const result = await axios
        .post(`${process.env.SERVICE_SANDY_PATH}/run`, formData)
        .then(resp => resp.data.result)
        .catch(err => err)

      if (typeof result.err === 'undefined') {
        res.status(200).send({
          result
        })
        return
      }
      next(result.err)
    } catch (err) {
      next(err)
    }
  }
}
