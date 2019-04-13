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
