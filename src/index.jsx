import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './config/service';
import createStore from './redux/createStore';
import App from './App';

const store = createStore({});

const container = document.createElement('div');
container.setAttribute('id', 'main');
document.body.appendChild(container);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
