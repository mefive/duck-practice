import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import store from './state/store';
import './config/service';
import App from './App';

const theme = createMuiTheme({});


const container = document.createElement('div');
container.setAttribute('id', 'main');
document.body.appendChild(container);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('main'),
);
