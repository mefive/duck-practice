import { createAction, handleActions } from 'redux-actions';
import { fetchUsers } from '../modules/user';

export const fetchData = createAction(
  'pages_users_fetch_data',
  async (dispatch) => {
    dispatch(updateLoading(true));

    try {
      await dispatch(fetchUsers)
    } finally {
      dispatch(updateLoading(false));
    }
  },
);

export const updateLoading = createAction('pages_user_update_loading');

const initialState = {
  isLoading: false,
};

export default handleActions({
  [updateLoading]: (state, action) => ({
    ...state,
    isLoading: action.payload,
  }),
}, initialState);
