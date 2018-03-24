const testcase = [
  {
    id: 1,
    task_id: 1,
    input: '1 3',
    expectedValue: '4'
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
  }
}
