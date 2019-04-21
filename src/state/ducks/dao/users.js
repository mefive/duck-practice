import { takeLatest, put } from 'redux-saga/effects';
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

export function* loadUsers({ payload: { page, size } }) {
  try {
    const { data, meta: { total } } = yield axios.get('/api/users', {
      params: {
        start: page * size,
        size,
      },
    });

    const { entities: { users }, result } = normalize(data, [userSchema]);

    yield put(loadUsersSuccess(users));

    return { ids: result, total };
  } catch (e) {
    yield put(loadUsersError(e));
    throw e;
  }
}

export function* saveUser({ payload: user }) {
  const {
    id, firstName, lastName, avatar, age, phone,
  } = user;

  try {
    const userSaved = (yield axios.post('/api/users', qs.stringify({
      id, firstName, lastName, avatar, age, phone,
    }, { skipNulls: true }))).data;

    yield put(saveUserSuccess(userSaved));
  } catch (e) {
    yield put(saveUserError(e));
    throw e;
  }
}

export function* deleteUser({ payload: id }) {
  try {
    yield axios.delete(`/api/users/${id}`);
    yield put(deleteUserSuccess(id));
  } catch (e) {
    yield put(deleteUserError(e));
    throw e;
  }
}

export function* saga() {
  yield takeLatest(loadUsersRequest, loadUsers);
  yield takeLatest(saveUserRequest, saveUser);
  yield takeLatest(deleteUserRequest, deleteUser);
}

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
