import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools
    : (middleware) => middleware;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
