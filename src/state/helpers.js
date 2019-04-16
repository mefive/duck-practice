import { createActions } from 'redux-actions';

export function createAsyncActions(verb = '', namespace) {
  return createActions(
    `${verb}_REQUEST`,
    `${verb}_SUCCESS`,
    `${verb}_ERROR`,
    {
      prefix: namespace,
    },
  );
}

export default {};
