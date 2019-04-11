import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

import Users from './Users';

export default () => (
  <React.Fragment>
    <CssBaseline />

    <AppBar position="static">
      <Box px={3} py={2}>
        <Typography variant="h6">
          Duck
        </Typography>
      </Box>
    </AppBar>

    <Users />
  </React.Fragment>
);
