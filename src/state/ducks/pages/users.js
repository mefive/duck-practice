import { createActions, handleActions } from 'redux-actions';
import { loadUsers } from '../users';

const initialState = {
  ids: [],
  page: 1,
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

export const loadData = page => async (dispatch) => {
  try {
    dispatch(loadDataRequest());

    const ids = await dispatch(loadUsers(page));

    dispatch(loadDataSuccess({ ids, page }));
  } catch (e) {
    dispatch(loadDataError(e));
  }
};

export default handleActions({
  [loadDataSuccess]: (state, { payload }) => ({
    ...state,
    ids: payload.ids,
    page: payload.page,
    isLoading: false,
  }),
}, initialState);
