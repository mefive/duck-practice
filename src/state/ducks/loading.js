export default function loading(state = {}, action) {
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

export function getLoading(state, namespace, request, castNull = true) {
  const p = state.loading[`${namespace}/${request}`];
  return castNull ? !!p : p;
}
