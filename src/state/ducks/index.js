import { combineReducers } from 'redux';

import pages from './pages';
import pending from './pending';
import users from './users';

export default combineReducers({
  pages,
  pending,
  users,
});
