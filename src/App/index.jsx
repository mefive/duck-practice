import React from 'react';
import { createGlobalStyle } from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

import Users from './Users';

const GlobalStyle = createGlobalStyle`
  body {
    background: #FFF;
  }
`;

export default () => (
  <React.Fragment>
    <CssBaseline />

    <GlobalStyle />

    <AppBar position="static">
      <Box px={3} py={2}>
        <Typography variant="h6">
          Duck
        </Typography>
      </Box>
    </AppBar>

    <Box p={2}>
      <Users />
    </Box>
  </React.Fragment>
);
