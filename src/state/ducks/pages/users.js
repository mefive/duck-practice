import { createActions, handleActions } from 'redux-actions';
import { put, takeLatest } from 'redux-saga/effects';
import { loadUsersEffects } from '../users';

const initialState = {
  ids: [],
  page: 0,
  size: 5,
  total: 0,
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

export function* loadDataEffects(action) {
  const { payload: { page, size } } = action;

  try {
    const { ids, total } = yield loadUsersEffects(action);

    yield put(loadDataSuccess({
      ids, page, size, total,
    }));
  } catch (e) {
    yield put(loadDataError(e));
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
}, initialState);
