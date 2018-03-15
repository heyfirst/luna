import actionCreator from '../libs/actionCreator'
import axios from '../libs/axios'

const helloAction = actionCreator('hello')

const SET_HELLO = helloAction('SET_HELLO', true)
const GET_HELLO = helloAction('GET_HELLO', true)
const SET_FIELD = helloAction('SET_FIELD')

let initialState = {
  loading: false,
  text: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HELLO.PENDING:
      return {
        ...state,
        loading: true
      }
    case SET_HELLO.RESOLVED:
      return {
        ...state,
        loading: false,
        text: action.payload
      }
    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }
    default: return state
  }
}

export const actions = {
  setHello: (text) => ({
    type: SET_HELLO,
    promise: axios.post('/hello/', { text }).then(resp => resp.data.text)
  }),
  getHello: () => ({
    type: GET_HELLO,
    promise: axios.get('/hello/')
  }),
  setField: (field, value) => ({
    type: SET_FIELD,
    field,
    value
  })
}
