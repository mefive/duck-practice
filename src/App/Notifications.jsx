import React from 'react';
import * as PropTypes from 'prop-types';
import {
  Slide, SnackbarContent, IconButton, Portal,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import { green, amber } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { removeNotification } from '../state/ducks/notifications';

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 18,
  },
  root: {
    zIndex: theme.zIndex.snackbar,
  },
}));

function Notifications(props) {
  const classes = useStyles();

  return (
    <Portal>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        mx={2}
        my={2}
        className={classes.root}
      >
        <TransitionGroup>
          {props.notifications.reverse().map(notification => (
            <Slide direction="right" key={notification.id}>
              <Box mt={1}>
                <SnackbarContent
                  classes={{
                    root: classes[notification.type],
                  }}
                  message={notification.message.split(/\r\n/g).map(msg => <div key={msg}>{msg}</div>)}
                  action={[
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        props.dispatch(removeNotification(notification.id));
                      }}
                      key="close"
                    >
                      <CloseIcon
                        classes={{
                          root: classes.icon,
                        }}
                      />
                    </IconButton>,
                  ]}
                />
              </Box>
            </Slide>
          ))}
        </TransitionGroup>
      </Box>
    </Portal>
  );
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string,
  })).isRequired,

  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps)(Notifications);
