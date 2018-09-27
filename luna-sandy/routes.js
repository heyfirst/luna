const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");

const Router = require("express").Router;
const router = Router();

const createJavaFile = (filepath, data, testcases) => {
  return new Promise((resolve, reject) => {
    const defaultClass = `
      class Main {
        static ${data}

        public static void main(String[] args){
          ${testcases.map(t => `System.out.println(${t.input});`).join("\n")}
        }

      }
    `;

    fs.writeFile(filepath, defaultClass, function(err) {
      if (err) reject(err);
      else resolve(defaultClass);
    });
  });
};

const removeUserFolder = async userID => {
  const compileCmd = `cd submissions && rm -rf user-${userID}`;
  const { stdout, stderr } = await exec(compileCmd);
  return {
    stdout,
    stderr
  };
};

const createUserFolder = async userID => {
  const compileCmd = `cd submissions && mkdir user-${userID}`;
  const { stdout, stderr } = await exec(compileCmd);
  return {
    stdout,
    stderr
  };
};

const compileJava = async filepath => {
  const compileCmd = `javac ${filepath}`;
  const { stdout, stderr } = await exec(compileCmd);
  return {
    stdout,
    stderr
  };
};

const runningTest = async classFilepath => {
  const runCmd = `cd ${classFilepath} && java Main`;
  const { stdout, stderr } = await exec(runCmd);
  return {
    stdout,
    stderr
  };
};

router.get("/", async (req, res) => {
  res.status(200).send({
    status: `[${process.env.PROJECT_NAME}] API Server is running!`
  });
});

router.post("/submission", async (req, res, next) => {
  const user = req.body.user;
  const testcases = req.body.testcases;
  const code = req.body.code;

  try {
    await removeUserFolder(user.id);
    // Creat Folder
    await createUserFolder(user.id);
    const filepath = `./submissions/user-${user.id}/submission-${user.id}.java`;
    const classFilepath = `./submissions/user-${user.id}/`;

    // Create File Java
    await createJavaFile(filepath, code, testcases, user);

    // Compile File Java to Main.class
    await compileJava(filepath);
    const output = await runningTest(classFilepath);

    // Compare Input and Output
    const result = await output.stdout
      .trim()
      .split("\n")
      .map((result, index) => {
        return {
          status: result === testcases[index].output
        };
      });

    Promise.all(result).then(async resp => {
      // Remove all files of user
      await removeUserFolder(user.id);
      res.status(200).send({
        status: "PASS",
        result: resp
      });
      return;
    });
  } catch (err) {
    // Remove all files of user
    await removeUserFolder(user.id);
    res.status(500).send({
      err
    });
    return;
  }
});

module.exports = router;
