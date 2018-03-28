// const knex = require('../../sql/knex')

const testcase = [
  {
    id: 1,
    task_id: 1,
    input: '1 3',
    expectedValue: '4'
  },
  {
    id: 2,
    task_id: 1,
    input: '6 3',
    expectedValue: '9'
  },
  {
    id: 2,
    task_id: 1,
    input: '100 200',
    expectedValue: '300'
  },
  {
    id: 2,
    task_id: 1,
    input: '1234 4343',
    expectedValue: '5577'
  },
  {
    id: 2,
    task_id: 1,
    input: '9999 9999',
    expectedValue: '19998'
  }
]

const tasks = [
  {
    id: 1,
    name: 'Addition',
    description: 'lorem .. ipsum ..',
    testcase
  }
]

module.exports = {
  getAll: () => {
    return tasks
  },
  getOne: (id) => {
    return tasks[0]
    // let task = await knex('tasks')
    //   .where({
    //     task_id: id
    //   })
    //   .select()
    //   .first()

    // let testcases = await knex('testcase')
    //   .where({
    //     task_id: id
    //   })
    //   .select()

    // return {
    //   ...task,
    //   testcases
    // }
  }
}
