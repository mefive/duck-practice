export function pendingSelector(state, namespace, request) {
  return state.pending[`${namespace}/${request}`] !== false;
}

export default {
  pendingSelector,
};
