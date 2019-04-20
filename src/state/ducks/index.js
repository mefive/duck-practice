import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import dao from './dao';
import view from './view';
import pending from './pending';

export default combineReducers({
  dao,
  view,
  pending,
  form,
});
