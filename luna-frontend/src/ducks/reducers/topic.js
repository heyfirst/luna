import actionCreator from '../../libs/actionCreator'
import axios from '../../libs/axios'

const topicAction = actionCreator('hello')

const GET_TOPIC = topicAction('GET_TOPIC')
const GET_USER = topicAction('GET_USER')

// function get data from API
const getTopic = async () => {
  const resp = await axios.get('https://api.dev.luna.codes/api/topic/')
  return resp.data
}

const getUser = async () => {
    // const resp = await axios.get('https://api.dev.luna.codes/topics/user/1')
    // return resp.data
    return {
        userID: 1,
        fullName: `Janjie beauty`,
        userName: `Janjie beauty`,
        userScore: [{
            userScoreID: 1,
            score: 99,
            topicID: 1,
            topicName: "Data Type",
            Task: [{
                taskID: 1,
                taskName: "Plus",
                timeStamp: Date()
            },
            {
                taskID: 2,
                taskName: "Minus",
                timeStamp: Date()
            }],
            timeStamp: Date()
        }]
    }
}

// initial state
let initialState = {
    topic: [],
    user: [],
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
        case GET_USER:
            return {
                ...state,
                loading: false,
                user: action.payload
            }    
        default: return state;
    }
}

// action
export const actions = {
    getTopic: () => ({
        type: GET_TOPIC,
        payload: getTopic()
    }),
    getUser: () => ({
        type: GET_USER,
        payload: getUser()
    })
}
