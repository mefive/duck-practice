import { createActions, handleActions } from 'redux-actions';
import {
  take, takeLatest, put, race,
} from 'redux-saga/effects';
import uniqueId from 'lodash/uniqueId';
import { sleep } from '../helpers';

export const namespace = '@notifications';

export const NOTIFICATION_TYPE_ERROR = 'Error';
export const NOTIFICATION_TYPE_INFO = 'Info';

export const {
  pushNotification,
  removeNotification,
} = createActions(
  {
    PUSH_NOTIFICATION: notification => ({
      ...notification,
      id: uniqueId(),
    }),
  },
  'REMOVE_NOTIFICATION',
  {
    prefix: namespace,
  },
);

const initialState = [];

function* handlePush({ payload: { id } }) {
  const result = yield race({
    timeout: sleep(3000),
    remove: take(removeNotification),
  });

  if ('timeout' in result) {
    yield put(removeNotification(id));
  }
}

export function* saga() {
  yield takeLatest(pushNotification, handlePush);
}

export default handleActions({
  [pushNotification]: (state, { payload: notification }) => ([
    ...state,
    notification,
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
