import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import * as modules from './modules';
import * as pages from './pages';

export default initialState => applyMiddleware(
  thunk,
)(createStore)(combineReducers({
  modules: combineReducers(modules),
  pages: combineReducers(pages),
}), // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ != null ? window.__REDUX_DEVTOOLS_EXTENSION__(initialState) : initialState);
