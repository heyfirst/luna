import actionCreator from '../../libs/actionCreator'
import axios from '../../libs/axios'

const solveAction = actionCreator('hello')

const SET_FIELD = solveAction('SET_FIELD')
const GET_TASK = solveAction('GET_TASK', true)
const RUN_TEST = solveAction('RUN_TEST', true)
const SUBMIT = solveAction('RUN_TEST', true)

let initialState = {
  // Task
  task: {},

  // Editor
  code: `class Sandbox {
      public static void main(String[] args) {
          int param1 = Integer.parseInt(args[0]);
          int param2 = Integer.parseInt(args[1]);
          int result = Sandbox.addition(param1, param2);
          System.out.print(result);
      }
      
      public static int addition(int a, int b) {
          return a + b;
      }
  }`,

  // Result
  loading: true,
  error: {},
  result: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }

    case GET_TASK.PENDING:
    case RUN_TEST.PENDING:
    case SUBMIT.PENDING:
      return {
        ...state,
        loading: true
      }

    case GET_TASK.RESOLVED:
      return {
        ...state,
        loading: false,
        task: action.payload
      }
    case RUN_TEST.RESOLVED:
      return {
        ...state,
        loading: false,
        result: action.payload
      }
    case SUBMIT.RESOLVED:
      return {
        ...state,
        loading: false,
        result: action.payload
      }

    case GET_TASK.REJECTED:
    case RUN_TEST.REJECTED:
    case SUBMIT.REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error

      }
    default: return state
  }
}

export const actions = {
  getTask: (taskID) => ({
    type: GET_TASK,
    promise: axios.get(`/tasks/${taskID}`)
      .then(resp => {
        console.log(resp.data.task)
        return {
          payload: resp.data.task
        }
      })
  }),
  setField: (field, value) => ({
    type: SET_FIELD,
    field,
    value
  }),
  runTest: (taskID, code) => {
    const formData = {
      taskID,
      code
    }

    return {
      type: RUN_TEST,
      promise: axios.post('/solve/run-test', formData)
        .then(resp => {
          console.log(resp)
          return {
            payload: resp.data.result
          }
        })
    }
  },
  submit: (taskID, code) => {
    const formData = {
      taskID,
      code
    }

    return {
      type: SUBMIT,
      promise: axios.post('/solve/submit', formData)
    }
  }
}
