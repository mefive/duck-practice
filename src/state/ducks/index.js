import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { spawn } from 'redux-saga/effects';

import dao, { saga as daoSaga } from './dao';
import view, { saga as viewSaga } from './view';
import loading from './loading';
import notifications, { saga as notificationsSaga } from './notifications';

export function* saga() {
  yield spawn(daoSaga);
  yield spawn(viewSaga);
  yield spawn(notificationsSaga);
}

export default combineReducers({
  dao,
  view,
  loading,
  notifications,
  form,
});
