import { createActions, handleActions } from 'redux-actions';
import uniqueId from 'lodash/uniqueId';

export const namespace = '@notifications';

export const {
  pushNotification,
  removeNotification,
} = createActions(
  {},
  'PUSH_NOTIFICATION',
  'REMOVE_NOTIFICATION',
  {
    prefix: namespace,
  },
);

const initialState = [];

export default handleActions({
  [pushNotification]: (state, { payload: notification }) => ([
    ...state,
    {
      ...notification,
      id: uniqueId(),
    },
  ]),

  [removeNotification]:
    (state, { payload: id }) => {
      const removeIndex = state.findIndex(n => n.id === id);

      if (removeIndex !== -1) {
        const queue = [...state];
        queue.splice(removeIndex, 1);
        return queue;
      }

      return state;
    },
}, initialState);
