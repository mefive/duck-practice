import { createActions, handleActions } from 'redux-actions';
import { put, takeLatest } from 'redux-saga/effects';
import * as users from '../users';

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
} = createActions(
  {
    LOAD_DATA: [undefined, () => ({ pending: true })],
  },
  'LOAD_DATA_SUCCESS',
  'LOAD_DATA_ERROR',
  {
    prefix: namespace,
  },
);

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
} = createActions(
  {
    SAVE_USER: [undefined, () => ({ pending: true })],
  },
  'SAVE_USER_SUCCESS',
  'CLOSE_USER_ERROR',
  {
    prefix: namespace,
  },
);

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
    yield put(loadData());
  } catch (e) {
    yield put(saveUserError(e));
  }
}

export function* saga() {
  yield takeLatest(loadData, loadDataEffects);
}

export default handleActions({
  [loadDataSuccess]: (state, { payload }) => ({
    ...state,
    ids: payload.ids,
    page: payload.page,
    size: payload.size,
    total: payload.total,
  }),

  [saveUserSuccess]: state => ({ ...state, open: false }),

  [openUser]: (state, { payload }) => ({
    ...state,
    open: true,
    user: payload || null,
  }),

  [closeUser]: state => ({ ...state, open: false }),
}, initialState);
