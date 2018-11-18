const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')

const Router = require('express').Router
const router = Router()

const createJavaFile = (filepath, data, testcases) => {
  return new Promise((resolve, reject) => {
    const defaultClass = `
      import java.math.*;
      import java.util.regex.*;
      import java.util.stream.*;
      import java.text.*;
      import java.security.SecureRandom;
      import java.util.function.*;
      import java.util.concurrent.*;
      import groovy.json.*;

      class Main {
        static ${data}

        public static void main(String[] args){
          ${testcases.map(t => `System.out.println(${t.test});`).join('\n')}
        }

      }
    `

    fs.writeFile(filepath, defaultClass, err => {
      if (err) reject(err)
      else resolve(defaultClass)
    })
  })
}

const removeUserFolder = async username => {
  const compileCmd = `cd submissions && rm -rf user-${username}`
  const { stdout, stderr } = await exec(compileCmd)
  return {
    stdout,
    stderr
  }
}

const createUserFolder = async username => {
  const compileCmd = `cd submissions && mkdir user-${username}`
  const { stdout, stderr } = await exec(compileCmd)
  return {
    stdout,
    stderr
  }
}

const compileJava = async filepath => {
  const compileCmd = `javac ${filepath}`
  const { stdout, stderr } = await exec(compileCmd)
  return {
    stdout,
    stderr
  }
}

const runningTest = async classFilepath => {
  const runCmd = `cd ${classFilepath} && java Main`
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

router.post('/submission', async (req, res, next) => {
  const username = req.body.username
  const testcases = req.body.testcases
  const code = req.body.code

  try {
    await removeUserFolder(username)
    // Creat Folder
    await createUserFolder(username)
    const filepath = `./submissions/user-${username}/submission-${username}.java`
    const classFilepath = `./submissions/user-${username}/`

    // Create File Java
    await createJavaFile(filepath, code, testcases)

    // Compile File Java to Main.class
    await compileJava(filepath)
    const output = await runningTest(classFilepath)

    // Compare Input and Output
    const result = await output.stdout
      .trim()
      .split('\n')
      .map((result, index) => {
        return {
          testcase_id: testcases[index].id,
          output: result,
          expected_output: testcases[index].expected_output,
          status: result === testcases[index].expected_output
        }
      })

    Promise.all(result).then(async result => {
      // Remove all files of user
      await removeUserFolder(username)
      let pass = true

      // Check pass or not
      if (result.filter(r => r.status === false).length > 0) {
        pass = false
      } else {
        pass = true
      }

      res.status(200).send({
        pass,
        result
      })
      return null
    })
  } catch (err) {
    // Remove all files of user
    await removeUserFolder(username)
    res.status(500).send({
      err
    })
    return null
  }
})

module.exports = router
