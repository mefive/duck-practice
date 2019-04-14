import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers, { saga } from './ducks';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(saga);
