import { createActions, handleActions } from 'redux-actions';
import { loadUsers } from '../users';

const initialState = {
  ids: [],
  page: 0,
  size: 5,
  total: 0,
};

export const namespace = '@page/users';

const {
  loadDataRequest,
  loadDataSuccess,
  loadDataError,
} = createActions(
  {},
  'LOAD_DATA_REQUEST',
  'LOAD_DATA_SUCCESS',
  'LOAD_DATA_ERROR',
  {
    prefix: namespace,
  },
);

export const loadData = (page, size) => async (dispatch) => {
  try {
    dispatch(loadDataRequest());

    const { ids, total } = await dispatch(loadUsers(page, size));

    dispatch(loadDataSuccess({
      ids, page, size, total,
    }));
  } catch (e) {
    dispatch(loadDataError(e));
  }
};

export default handleActions({
  [loadDataSuccess]: (state, { payload }) => ({
    ...state,
    ids: payload.ids,
    page: payload.page,
    size: payload.size,
    total: payload.total,
  }),
}, initialState);
