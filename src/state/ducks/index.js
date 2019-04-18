import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import page from './page';
import pending from './pending';
import users from './users';

export default combineReducers({
  page,
  pending,
  users,
  form,
});
