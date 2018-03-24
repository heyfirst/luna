const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')

const Router = require('express').Router
const router = Router()

const createJavaFile = (filepath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, data, function (err) {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const compileJava = async (filepath) => {
  const compileCmd = `javac ${filepath}`
  const { stdout, stderr } = await exec(compileCmd)
  return {
    stdout,
    stderr
  }
}

const runningTest = async (input) => {
  const runCmd = `cd judges && java Sandbox ${input}`
  const { stdout, stderr } = await exec(runCmd)
  return {
    stdout,
    stderr
  }
}

router.get('/', async (req, res) => {
  res.status(200).send({
    status: `[${process.env.PROJECT_NAME}] API Server is running!`
  })
})

router.post('/run', async (req, res, next) => {
  const testcase = req.body.testcase
  const code = req.body.code

  const filepath = `./judges/test.java`
  await createJavaFile(filepath, code)

  await compileJava(filepath)

  const result = testcase.map(async (tc, index) => {
    const result = await runningTest(tc.input)
    return result.stdout === tc.expectedValue
  })

  Promise.all(result).then((resp) => {
    console.log(resp)
    res.status(200).send({
      status: 'PASS',
      result: resp
    })
  })
})

module.exports = router
