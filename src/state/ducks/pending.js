import { takeLatest, put } from 'redux-saga/effects';

function* pendingEffects({ type }) {
  yield put({ type: `${type}_REQUEST` });
}

export function* saga() {
  yield takeLatest(action => action.meta && action.meta.pending, pendingEffects);
}

export default function pending(state = {}, action) {
  const { type } = action;

  const matches = /^(.*)_(REQUEST|SUCCESS|ERROR)$/.exec(type);

  if (matches) {
    const [, requestName, requestState] = matches;

    return {
      ...state,
      [requestName]: requestState === 'REQUEST',
    };
  }

  return state;
}
