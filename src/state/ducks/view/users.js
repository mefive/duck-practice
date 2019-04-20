import { createActions, handleActions, combineActions } from 'redux-actions';
import { SubmissionError } from 'redux-form';
import * as userActions from '../dao/users';
import { createAsyncActions } from '../../helpers';
import { getPending } from '../pending';

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

  confirmDeletingRequest,
  confirmDeletingReject,
} = createActions(
  {},
  'OPEN_USER',
  'CLOSE_USER',
  'CONFIRM_DELETING_REQUEST',
  'CONFIRM_DELETING_REJECT',
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

export const loadData = payload => async (dispatch, getState) => {
  if (getPending(getState(), namespace, 'LOAD_DATA')) {
    return;
  }

  const state = getState().view.users;

  const { page = state.page, size = state.size } = payload || {};

  try {
    dispatch(loadDataRequest({ page, size }));

    const { ids, total } = await dispatch(userActions.loadUsers({ page, size }));

    dispatch(loadDataSuccess({
      ids, page, size, total,
    }));
  } catch (e) {
    dispatch(loadDataError(e));
    throw e;
  }
};

export const saveUser = user => async (dispatch) => {
  try {
    dispatch(saveUserRequest(user));

    await dispatch(userActions.saveUser(user));

    dispatch(saveUserSuccess());

    dispatch(loadData());
  } catch (e) {
    dispatch(saveUserError(e));

    if (e.status === 1001) {
      throw new SubmissionError({
        phone: e.message,
      });
    } else {
      throw e;
    }
  }
};

export const deleteUser = id => async (dispatch) => {
  try {
    dispatch(deleteUserRequest(id));
    await dispatch(userActions.deleteUser(id));
    dispatch(deleteUserSuccess());
    dispatch(loadData());
  } catch (e) {
    dispatch(deleteUserError());
    throw e;
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

  [openUser]: (state, { payload: userId }) => ({
    ...state,
    open: true,
    openId: userId,
  }),

  [combineActions(saveUserSuccess, closeUser)]: state => ({ ...state, open: false }),

  [confirmDeletingRequest]: (state, { payload: id }) => ({ ...state, deletingId: id }),

  [combineActions(deleteUserSuccess, confirmDeletingReject)]:
    state => ({ ...state, deletingId: null }),
}, initialState);
