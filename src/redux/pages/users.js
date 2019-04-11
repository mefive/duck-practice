import { createAction, handleActions } from 'redux-actions';
import { fetchUsers } from '../modules/users';

const actionPrefix = 'pages_users';

export const fetchData = createAction(
  `${actionPrefix}_fetch_data`,
  async (dispatch) => {
    dispatch(updateLoading(true));

    try {
      const ids = await dispatch(fetchUsers).payload;
      dispatch(updateIds(ids.slice(0, 10)));
    } finally {
      dispatch(updateLoading(false));
    }
  },
);

export const updateLoading = createAction(`${actionPrefix}_update_loading`);

export const updateIds = createAction(`${actionPrefix}_update_ids`);

const initialState = {
  isLoading: true,
  ids: [],
};

export default handleActions({
  [updateLoading]: (state, action) => ({
    ...state,
    isLoading: action.payload,
  }),

  [updateIds]: (state, action) => ({
    ...state,
    ids: action.payload,
  })
}, initialState);
