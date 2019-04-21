import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducers, { saga } from './ducks';

const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunk,
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(saga);
