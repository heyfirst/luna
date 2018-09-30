const controller = require('../controller')

describe('Test Controller!', () => {
  it(`Return Correctly!`, () => {
    const response = controller.testController()
    expect(response).toEqual({
      status: 200,
      text: 'Hi'
    })
  })
  it(`Return Correctly 2!`, () => {
    const response = controller.testController2()
    expect(response).toEqual({
      status: 200,
      text: 'Hi'
    })
  })
})
