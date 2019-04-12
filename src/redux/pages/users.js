import { createActions, handleActions } from 'redux-actions';
import { loadPage } from '../modules/users';

const initialState = {
  ids: [],
  page: 1,
};

const {
  loadSuccess,
} = createActions(
  {},
  'LOAD_SUCCESS',
  {
    prefix: '@page/users',
  },
);

export const loadData = page => async (dispatch) => {
  const ids = await dispatch(loadPage(page));
  dispatch(loadSuccess({ ids, page }));
};

export default handleActions({
  [loadSuccess]: (state, { payload }) => ({
    ...state,
    ids: payload.ids,
    page: payload.page,
  }),
}, initialState);
