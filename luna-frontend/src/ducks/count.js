
const plus = 'myapp/count/plus'

let initialState = {
  count: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case plus:
      return {
        count: state.count + 1,
      }
    default: return state
  }
}

export const actions = {
  plusCounter: async () => {

    return {
      type: 'PLUS',
    }
  }
}
