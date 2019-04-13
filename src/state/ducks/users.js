import axios from 'axios';
import { createActions, handleActions } from 'redux-actions';
import { schema, normalize } from 'normalizr';

const userSchema = new schema.Entity('users');

const initialState = {};

export const namespace = '@users';

const {
  loadUsersRequest,
  loadUsersSuccess,
  loadUsersError,
} = createActions(
  {},
  'LOAD_USERS_REQUEST',
  'LOAD_USERS_SUCCESS',
  'LOAD_USERS_ERROR',
  {
    prefix: namespace,
  },
);

export const loadUsers = page => async (dispatch) => {
  dispatch(loadUsersRequest());

  const size = 5;

  try {
    const { data } = await axios.get('/api/users', {
      params: {
        start: (page - 1) * size,
        size,
      },
    });

    const { entities: { users }, result } = normalize(data, [userSchema]);

    dispatch(loadUsersSuccess(users));

    return result;
  } catch (e) {
    dispatch(loadUsersError());
    return [];
  }
};

export default handleActions({
  [loadUsersSuccess]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, initialState);
