import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import './config/service';
import createStore from './redux/createStore';
import Users from './Users';

const store = createStore({});

const container = document.createElement('div');
container.setAttribute('id', 'main');
document.body.appendChild(container);

ReactDOM.render(
  <Provider store={store}>
    <AppBar position="static">
      <Box px={3} py={2}>
        <Typography variant="h6">
          Duck
        </Typography>
      </Box>
    </AppBar>

    <Users />
  </Provider>,
  document.getElementById('main'),
);
