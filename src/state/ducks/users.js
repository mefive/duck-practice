import axios from 'axios';
import { createActions, handleActions } from 'redux-actions';
import { put, takeLatest } from 'redux-saga/effects';
import { schema, normalize } from 'normalizr';

const userSchema = new schema.Entity('users');

const initialState = {};

export const namespace = '@users';

const {
  loadUsers,
  loadUsersSuccess,
  loadUsersError,
} = createActions(
  {
    LOAD_USERS: [undefined, () => ({ pendng: true })],
  },
  'LOAD_USERS_SUCCESS',
  'LOAD_USERS_ERROR',
  {
    prefix: namespace,
  },
);

export function* loadUsersEffects({ payload: { page, size } }) {
  try {
    const { data, total } = yield axios.get('/api/users', {
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
    return null;
  }
}

export function* saga() {
  yield takeLatest(loadUsers, loadUsersEffects);
}

export default handleActions({
  [loadUsersSuccess]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, initialState);
