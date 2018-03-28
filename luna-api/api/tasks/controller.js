const model = require('./model')

module.exports = {
  getTasks: (req, res, next) => {
    try {
      const tasks = model.getAll()
      res.status(200).send({
        tasks
      })
    } catch (err) {
      next(err)
    }
  },
  getTask: (req, res, next) => {
    const id = req.params.id
    try {
      const task = model.getOne(id)
      setTimeout(() => {
        res.status(200).send({
          task
        })
      }, 1000)
    } catch (err) {
      next(err)
    }
  }
}
