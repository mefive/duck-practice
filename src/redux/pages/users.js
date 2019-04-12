import { createActions, handleActions } from 'redux-actions';
import { loadPage } from '../modules/users';

const initialState = {
  ids: [],
  page: 1,
  isLoading: true,
};

const {
  loadRequest,
  loadSuccess,
  loadError,
} = createActions(
  {},
  'LOAD_REQUEST',
  'LOAD_SUCCESS',
  'LOAD_ERROR',
  {
    prefix: '@page/users',
  },
);

export const loadData = page => async (dispatch) => {
  try {
    dispatch(loadRequest());

    const ids = await dispatch(loadPage(page));

    dispatch(loadSuccess({ ids, page }));
  } catch (e) {
    dispatch(loadError());
  }
};

export default handleActions({
  [loadRequest]: state => ({
    ...state,
    isLoading: true,
  }),

  [loadSuccess]: (state, { payload }) => ({
    ...state,
    ids: payload.ids,
    page: payload.page,
    isLoading: false,
  }),

  [loadError]: state => ({
    ...state,
    isLoading: false,
  }),
}, initialState);
