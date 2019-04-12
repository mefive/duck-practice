import axios from 'axios';
import { createActions, handleActions } from 'redux-actions';
import { schema, normalize } from 'normalizr';

const userSchema = new schema.Entity('users');

const initialState = {
  users: {},
  isLoading: false,
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
    prefix: '@module/users',
  },
);

export const loadPage = page => async (dispatch) => {
  dispatch(loadRequest);

  const size = 5;

  try {
    const { data } = await axios.get('/api/users', {
      params: {
        start: (page - 1) * size,
        size,
      },
    });

    const { entities: { users }, result } = normalize(data, [userSchema]);

    dispatch(loadSuccess(users));

    return result;
  } catch (e) {
    dispatch(loadError());
    return [];
  }
};

export default handleActions({
  [loadRequest]: state => ({
    ...state,
    isLoading: true,
  }),

  [loadSuccess]: (state, { payload }) => ({
    ...state,
    users: {
      ...state.users,
      ...payload,
    },
    isLoading: false,
  }),

  [loadError]: state => ({
    ...state,
    isLoading: false,
  }),
}, initialState);
