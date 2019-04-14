import { combineReducers } from 'redux';
import { spawn } from 'redux-saga/effects';

import users, { saga as usersSaga } from './users';

export function* saga() {
  yield spawn(usersSaga);
}

export default combineReducers({
  users,
});
