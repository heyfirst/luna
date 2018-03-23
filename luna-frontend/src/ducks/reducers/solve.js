import actionCreator from '../../libs/actionCreator'
import axios from '../../libs/axios'

const solveAction = actionCreator('hello')

const SET_FIELD = solveAction('SET_FIELD')
const RUN_TEST = solveAction('RUN_TEST')

let initialState = {
  // Editor
  code: '',

  // Result
  result: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }
    case RUN_TEST:
      return {
        ...state,
        result: action.payload
      }
    default: return state
  }
}

export const actions = {
  setField: (field, value) => ({
    type: SET_FIELD,
    field,
    value
  }),
  runTest: (taskID, code) => {
    const formData = {
      code,
      taskID
    }

    return {
      type: RUN_TEST,
      promise: axios.post('/solve/run-test', formData)
    }
  },
  submit: (taskID, code) => {
    const formData = {
      code,
      taskID
    }

    return {
      type: RUN_TEST,
      promise: axios.post('/solve/submit', formData)
    }
  }
}
