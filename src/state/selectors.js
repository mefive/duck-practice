export function pendingSelector(state, namespace, request) {
  return !!state.pending[`${namespace}/${request}`];
}

export default {
  pendingSelector,
};
