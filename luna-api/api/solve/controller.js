module.exports = {
  runTest: async (req, res, next) => {
    console.log(req.body)
    res.status(200).send({
      text: `Run Test!`
    })
  },
  submit: async (req, res, next) => {
    console.log(req.body)
    res.status(200).send({
      text: `Run Test!`
    })
  }
}
