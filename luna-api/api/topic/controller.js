const { getOne,getAll } = require('./model')

module.exports = {
  getAllTopics: async (req, res, next) => {
    const allResult = await getAll()
    res.status(200).send(allResult) 
  },
  getOneTopics: async (req, res, next) => {
    const { id } = req.params
    const result = await getOne(id)

    res.status(200).send(result) 
  } 
}
