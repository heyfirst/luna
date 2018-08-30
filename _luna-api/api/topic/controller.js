const { getOne,getAll,getUserScore } = require('./model')

module.exports = {
  getAllTopics: async (req, res, next) => {
    const allResult = await getAll()
    res.status(200).send(allResult) 
  },
  getOneTopics: async (req, res, next) => {
    const { id } = req.params
    const result = await getOne(id)

    res.status(200).send(result) 
  },
  getUserScore: async (req, res, next) => {
    const { userid } = req.params
    const result = await getUserScore(userid)

    res.status(200).send(result)
  }
}
