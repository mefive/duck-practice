import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import users, { saga as userSaga } from './users';

export function* saga() {
  yield fork(userSaga);
}

export default combineReducers({
  users,
});
