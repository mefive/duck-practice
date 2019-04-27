import React from 'react';
import { createGlobalStyle } from 'styled-components';
import {
  AppBar, Typography, CssBaseline, Container,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

import Users from './Users';
import Notifications from './Notifications';

const GlobalStyle = createGlobalStyle`
  body {
    background: #FFF;
  }
`;

const useStyles = makeStyles(theme => ({
  root: props => ({
    paddingTop: theme.spacing(2) + props.headerHeight,
  }),
}));

function App() {
  const header = React.useRef(null);
  const [headerHeight, setHeaderHeight] = React.useState(0);

  React.useEffect(
    () => setHeaderHeight(header.current.clientHeight),
    [header.current],
  );

  const classes = useStyles({ headerHeight });

  return (
    <React.Fragment>
      <CssBaseline />

      <GlobalStyle />

      <AppBar position="fixed" innerRef={header}>
        <Box px={3} py={2}>
          <Typography variant="h6">
              Duck
          </Typography>
        </Box>
      </AppBar>

      <Container
        maxWidth="lg"
        classes={{ root: classes.root }}
      >
        <Users />
      </Container>

      <Notifications />
    </React.Fragment>
  );
}

export default App;
