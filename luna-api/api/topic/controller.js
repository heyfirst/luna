const axios = require('../../libs/axios')
const getAll = require('./model').getAll
const getOne = require('./model').getOne
const topic = getAll()
const topicOne = getOne()

module.exports = {
  getAllTopics: async (req, res, next) => {
    res.status(200).send(topic) 
  },
  getOneTopics: async (req, res, next) => {
    res.status(200).send(topicOne) 
  } 
}
