import { createActions, handleActions, combineActions } from 'redux-actions';
import { put, takeLatest, select } from 'redux-saga/effects';
import * as users from '../users';
import { createAsyncActions } from '../../helpers';

const initialState = {
  ids: [],
  page: 0,
  size: 5,
  total: 0,
  open: false,
  user: null,
};

export const namespace = '@page/users';

export const {
  loadData,
  loadDataSuccess,
  loadDataError,
} = createAsyncActions('LOAD_DATA', namespace);

export const {
  openUser,
  closeUser,
} = createActions(
  {},
  'OPEN_USER',
  'CLOSE_USER',
  {
    prefix: namespace,
  },
);

export const {
  saveUser,
  saveUserSuccess,
  saveUserError,
} = createAsyncActions('SAVE_USER', namespace);

export function* loadDataEffects(action) {
  const { payload: { page, size } } = action;

  try {
    const { ids, total } = yield users.loadUsersEffects(action);

    yield put(loadDataSuccess({
      ids, page, size, total,
    }));
  } catch (e) {
    yield put(loadDataError(e));
  }
}

export function* saveUserEffects(action) {
  try {
    yield users.saveUserEffects(action);
    yield put(saveUserSuccess());

    const { page, size } = (yield select()).pages.users;

    yield put(loadData({ page, size }));
  } catch (e) {
    yield put(saveUserError(e));
  }
}

export function* saga() {
  yield takeLatest(loadData, loadDataEffects);
  yield takeLatest(saveUser, saveUserEffects);
}

export default handleActions({
  [loadDataSuccess]: (state, { payload }) => ({
    ...state,
    ids: payload.ids,
    page: payload.page,
    size: payload.size,
    total: payload.total,
  }),

  [openUser]: (state, { payload }) => ({
    ...state,
    open: true,
    user: payload || null,
  }),

  [combineActions(saveUserSuccess, closeUser)]: state => ({ ...state, open: false }),
}, initialState);
