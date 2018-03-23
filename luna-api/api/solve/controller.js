const axios = require('../../libs/axios')

module.exports = {
  runTest: async (req, res, next) => {
    try {
      console.log(req.body)

      // get Task

      // send to [Sandbox]
      const formData = {
        code: req.body.code,
        testcase: [
          {
            input: '1 2',
            expectedOutput: '3'
          },
          {
            input: '6 7',
            expectedOutput: '13'
          }
        ]
      }

      const result = await axios
        .post(`${process.env.SERVICE_SANDY_PATH}/run`, formData)
        .then(resp => resp.data.result)

      res.status(200).send({
        result
      })
    } catch (err) {
      next(err)
    }
  },
  submit: async (req, res, next) => {
    try {
      console.log(req.body)

      // get Task

      // send to [Sandbox]

      // set Result on Answer

      res.status(200).send({
        result: {}
      })
    } catch (err) {
      next(err)
    }
  }
}
