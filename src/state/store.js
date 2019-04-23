import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reducers, { saga } from './ducks';
import { NOTIFICATION_TYPE_ERROR, pushNotification } from './ducks/notifications';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let dispatch;

const sagaMiddleware = createSagaMiddleware({
  onError(error) {
    let { message } = error;

    if (error.url) {
      message = `${error.url}\r\n${message}`;
    }

    dispatch(pushNotification({
      type: NOTIFICATION_TYPE_ERROR,
      message,
    }));

    sagaMiddleware.run(saga);
  },
});

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunk,
      sagaMiddleware,
    ),
  ),
);

export default store;

({ dispatch } = store);

sagaMiddleware.run(saga);
