import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import reducers from './reducers';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});

export default createStore(
  reducers,
  // compose(applyMiddleware(loggerMiddleware)),
);
