import { createStore, applyMiddleware, combineReducers } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import * as modules from './modules';
import * as pages from './pages';

export default initialState => applyMiddleware(
  promise,
  thunk,
)(createStore)(combineReducers({
  modules: combineReducers(modules),
  pages: combineReducers(pages),
}), window.__REDUX_DEVTOOLS_EXTENSION__ != null ? window.__REDUX_DEVTOOLS_EXTENSION__(initialState): initialState);
