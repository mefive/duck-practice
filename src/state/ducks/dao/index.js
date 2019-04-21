import { combineReducers } from 'redux';
import { spawn } from 'redux-saga/effects';
import users, { saga as userSaga } from './users';

export function* saga() {
  yield spawn(userSaga);
}

export default combineReducers({
  users,
});
