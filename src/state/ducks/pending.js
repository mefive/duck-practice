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

export function getPending(state, namespace, request, castNull = true) {
  const p = state.pending[`${namespace}/${request}`];
  return castNull ? !!p : p;
}
