import { createActions, handleActions, combineActions } from 'redux-actions';
import { stopSubmit, startSubmit } from 'redux-form';
import { put, takeLatest, select } from 'redux-saga/effects';
import * as userDao from '../dao/users';
import { createAsyncActions } from '../../helpers';
import { NOTIFICATION_TYPE_SUCCESS, pushNotification } from '../notifications';

const initialState = {
  ids: [],
  page: 0,
  size: 5,
  total: 0,
  open: false,
  openId: null,
  deletingId: null,
};

export const namespace = '@view/users';

export const {
  openUser,
  closeUser,

  deletingRequest,
  deletingCancel,
} = createActions(
  {},
  'OPEN_USER',
  'CLOSE_USER',
  'DELETING_REQUEST',
  'DELETING_CANCEL',
  {
    prefix: namespace,
  },
);

export const {
  loadDataRequest,
  loadDataSuccess,
  loadDataError,
} = createAsyncActions('LOAD_DATA', namespace);

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

export function* loadData({ payload } = {}) {
  const state = yield select();

  const { users } = state.view;

  const { page = users.page, size = users.size } = payload || {};

  try {
    const { ids, total } = yield userDao.loadUsers({
      payload: {
        page, size,
      },
    });

    yield put(loadDataSuccess({
      ids, page, size, total,
    }));
  } catch (e) {
    yield put(loadDataError(e));
    throw e;
  }
}

export function* saveUser({ payload }) {
  try {
    yield put(startSubmit(
      `${namespace}/user`,
    ));

    yield userDao.saveUser({ payload });

    yield put(saveUserSuccess());

    yield put(pushNotification({
      type: NOTIFICATION_TYPE_SUCCESS,
      message: 'Save Success',
    }));

    yield put(loadDataRequest());
  } catch (e) {
    yield put(saveUserError(e));

    if (e.status === 1001) {
      yield put(stopSubmit(
        `${namespace}/user`,
        {
          phone: e.message,
        },
      ));
    } else {
      throw e;
    }
  } finally {
    yield put(stopSubmit(`${namespace}/user`));
  }
}

export function* deleteUser({ payload }) {
  try {
    yield userDao.deleteUser({ payload });

    yield put(deleteUserSuccess());

    yield put(pushNotification({
      type: NOTIFICATION_TYPE_SUCCESS,
      message: 'Delete Success',
    }));
    yield put(loadDataRequest());
  } catch (e) {
    yield put(deleteUserError());
    throw e;
  }
}

export function* saga() {
  yield takeLatest(loadDataRequest, loadData);
  yield takeLatest(saveUserRequest, saveUser);
  yield takeLatest(deleteUserRequest, deleteUser);
}

export default handleActions({
  [loadDataSuccess]: (state, { payload }) => ({
    ...state,
    ids: payload.ids,
    page: payload.page,
    size: payload.size,
    total: payload.total,
  }),

  [openUser]: (state, { payload: userId }) => ({
    ...state,
    open: true,
    openId: userId,
  }),

  [combineActions(saveUserSuccess, closeUser)]: state => ({ ...state, open: false }),

  [deletingRequest]: (state, { payload: id }) => ({ ...state, deletingId: id }),

  [combineActions(deleteUserSuccess, deletingCancel)]:
    state => ({ ...state, deletingId: null }),
}, initialState);
