import { createActions, handleActions, combineActions } from 'redux-actions';
import * as userActions from '../users';
import { createAsyncActions } from '../../helpers';
import { getPending } from '../pending';

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
  loadDataRequest,
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
  saveUserRequest,
  saveUserSuccess,
  saveUserError,
} = createAsyncActions('SAVE_USER', namespace);

export const loadData = ({ page, size }) => async (dispatch, getState) => {
  if (getPending(getState(), namespace, 'LOAD_DATA')) {
    return;
  }

  try {
    dispatch(loadDataRequest({ page, size }));

    const { ids, total } = await dispatch(userActions.loadUsers({ page, size }));

    dispatch(loadDataSuccess({
      ids, page, size, total,
    }));
  } catch (e) {
    dispatch(loadDataError(e));
  }
};

export const saveUser = user => async (dispatch, getState) => {
  try {
    dispatch(saveUserRequest(user));

    await dispatch(userActions.saveUser(user));

    dispatch(saveUserSuccess());

    const { page, size } = getState().page.users;

    dispatch(loadData({ page, size }));
  } catch (e) {
    dispatch(saveUserError(e));
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

  [openUser]: (state, { payload: user }) => ({
    ...state,
    open: true,
    user: user ? { ...user } : null,
  }),

  [combineActions(saveUserSuccess, closeUser)]: state => ({ ...state, open: false }),
}, initialState);
