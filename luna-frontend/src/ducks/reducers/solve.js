import actionCreator from '../../libs/actionCreator'
import axios from '../../libs/axios'

const solveAction = actionCreator('hello')

const SET_FIELD = solveAction('SET_FIELD')

let initialState = {
  loading: false,
  code: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }
    default: return state
  }
}

export const actions = {
  setField: (field, value) => ({
    type: SET_FIELD,
    field,
    value
  })
}
