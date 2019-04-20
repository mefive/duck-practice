import axios from 'axios';
import qs from 'qs';
import { handleActions } from 'redux-actions';
import { schema, normalize } from 'normalizr';
import omit from 'lodash/omit';
import { createAsyncActions } from '../../helpers';

const userSchema = new schema.Entity('users');

const initialState = {};

export const namespace = '@dao/users';

const {
  loadUsersRequest,
  loadUsersSuccess,
  loadUsersError,
} = createAsyncActions('LOAD_USERS', namespace);

export const {
  saveUserRequest,
  saveUserSuccess,
  saveUserError,
} = createAsyncActions('SAVE_USER', namespace);

export const {
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserError,
} = createAsyncActions('DELETE_USER', namespace);

export const loadUsers = ({ page, size }) => async (dispatch) => {
  try {
    dispatch(loadUsersRequest({ page, size }));

    const { data, meta: { total } } = await axios.get('/api/users', {
      params: {
        start: page * size,
        size,
      },
    });

    const { entities: { users }, result } = normalize(data, [userSchema]);

    dispatch(loadUsersSuccess(users));

    return { ids: result, total };
  } catch (e) {
    dispatch(loadUsersError(e));
    return null;
  }
};

export const saveUser = user => async (dispatch) => {
  const {
    id, firstName, lastName, avatar, age, phone,
  } = user;

  try {
    dispatch(saveUserRequest(user));

    const userSaved = (await axios.post('/api/users', qs.stringify({
      id, firstName, lastName, avatar, age, phone,
    }, { skipNulls: true }))).data;

    dispatch(saveUserSuccess(userSaved));
  } catch (e) {
    dispatch(saveUserError(e));
    throw e;
  }
};

export const deleteUser = id => async (dispatch) => {
  try {
    dispatch(deleteUserRequest(id));
    await axios.delete(`/api/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (e) {
    dispatch(deleteUserError(e));
    throw e;
  }
};

export default handleActions({
  [loadUsersSuccess]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),

  [saveUserSuccess]: (state, { payload }) => ({
    ...state,
    [payload.id]: payload,
  }),

  [deleteUserSuccess]: (state, { payload: id }) => omit(state, id),
}, initialState);
