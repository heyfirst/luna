import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from '../ducks/reducers'
import promiseMiddleware from '../ducks/middlewares/promiseMiddleware'

const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const createStore = (history) => {
  const middleware = routerMiddleware(history)
  return _createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    composeEnhancers(
      applyMiddleware(thunk),
      applyMiddleware(promiseMiddleware),
      applyMiddleware(middleware)
    )
  )
}

export default createStore
