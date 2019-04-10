import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

export const fetchUsers = createAction('' +
  'module_user_fetch_users',
  async (dispatch) => {
    const users = (await axios.get('/api/users')).data;
    dispatch(updateUsers(users));
  },
);

export const updateUsers = createAction('module_user_update_users');

const initialState = {
  users: [],
};

export default handleActions({
  [updateUsers]: (state, action) => ({
    ...state,
    users: action.payload,
  }),
}, initialState);
