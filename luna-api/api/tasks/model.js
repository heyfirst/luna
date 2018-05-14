const knex = require('../../sql/knex')

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
    id: 3,
    task_id: 1,
    input: '100 200',
    expectedValue: '300'
  },
  {
    id: 4,
    task_id: 1,
    input: '1234 4343',
    expectedValue: '5577'
  },
  {
    id: 5,
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
  getOne: async id => {
    let task = await knex('task')
      .where({ task_id: id })
      .first()

    let testcase = await knex('testcase')
      .where({ task_id: id })
      .select()

    return {
      ...task,
      testcase
    }
  }
}

// module.exports = {
//   getAll: async args => {
//     let dealers = await knex('jpms_dealers')
//       .where(args)
//       .select()
//     return dealers
//   },
//   getOne: async id => {
//     let dealer = await knex('jpms_dealers')
//       .where({
//         id
//       })
//       .first()
//     return dealer
//   },
//   create: async args => {
//     let dealer = await knex('jpms_dealers')
//       .returning('id')
//       .insert(args)
//     return dealer[0]
//   },
//   update: async (id, args) => {
//     let dealer = await knex('jpms_dealers')
//       .where({ id })
//       .update(args)
//     return dealer
//   },
//   delete: async id => {
//     let dealer = await knex('jpms_dealers')
//       .where({ id })
//       .delete()
//     return dealer
//   }
// }
