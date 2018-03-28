const { getOne } = require('./model')

module.exports = {
  getAllTopics: async (req, res, next) => {
    res.status(200).send(topic) 
  },
  getOneTopics: async (req, res, next) => {
    const { id } = req.params
    const result = await getOne(id)

    res.status(200).send(result) 
  } 
}
