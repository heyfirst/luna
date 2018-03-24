const axios = require('../../libs/axios')
const model = require('./model')

module.exports = {
  getTasks: (req, res, next) => {
    const tasks = model.getAll()
    res.status(200).send({
      tasks
    })
  }
}
