import actionCreator from '../../libs/actionCreator'
import axios from '../../libs/axios'

const topicAction = actionCreator('hello')

const GET_TOPIC = topicAction('GET_TOPIC')

// function get data from API
const getTopic = async () => {
  const resp = await axios.get('https://api.luna.codes/topics')
  return resp.data
}

// initial state
let initialState = {
  topic: [],
  loading: true
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOPIC:
      return {
        ...state,
        loading: false,
        topic: action.payload
      }
    default: return state
  }
}

// action
export const actions = {
  getTopic: () => ({
    type: GET_TOPIC,
    payload: getTopic()
  })
}
