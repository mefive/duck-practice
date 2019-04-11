import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const actionPrefix = 'module_users';

export const fetchUsers = createAction(
  `${actionPrefix}_fetch_users`,
  async (dispatch) => {
    const users = (await axios.get('/api/users')).data;
    dispatch(updateUsers(users));
    return users.map(user => user.id);
  },
);

export const updateUsers = createAction(`${actionPrefix}_update_users`);

const initialState = {};

export default handleActions({
  [updateUsers]: (state, action) => ({
    ...state,
    ...action.payload.reduce((p, c) => ({
      ...p,
      [c.id]: c,
    }), {}),
  }),
}, initialState);
