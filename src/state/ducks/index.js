import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import pages from './pages';
import pending from './pending';
import users from './users';

export default combineReducers({
  pages,
  pending,
  users,
  form,
});
