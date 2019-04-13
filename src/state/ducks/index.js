import { spawn } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import pages, { saga as pagesSaga } from './pages';
import pending, { saga as pendingSaga } from './pending';
import users, { saga as usersSaga } from './users';

export function* saga() {
  yield spawn(pagesSaga);
  yield spawn(pendingSaga);
  yield spawn(usersSaga);
}

export default combineReducers({
  pages,
  pending,
  users,
});
