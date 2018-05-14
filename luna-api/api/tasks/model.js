const knex = require('../../sql/knex')

module.exports = {
  getAll: () => {
    return []
  },
  getOne: async (id, isSubmit) => {
    let task = await knex('task')
      .where({
        task_id: id
      })
      .first()

    let testcase = []
    if (isSubmit) {
      testcase = await knex('testcase')
        .where({
          task_id: id
        })
        .select()
    } else {
      testcase = await knex('testcase')
        .where({
          task_id: id,
          is_hidden: 0
        })
        .select()
    }

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
