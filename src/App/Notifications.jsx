import React from 'react';
import * as PropTypes from 'prop-types';
import { Slide, SnackbarContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import { TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { removeNotification } from '../state/ducks/notifications';

function Notifications(props) {
  return (
    <Box position="fixed" bottom={0} left={0} mx={2} my={2}>
      <TransitionGroup>
        {props.notifications.reverse().map(notification => (
          <Slide direction="right" key={notification.id}>
            <Box mt={1}>
              <SnackbarContent
                message={notification.message}
                action={[
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      props.dispatch(removeNotification(notification.id));
                    }}
                    key="close"
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
            </Box>
          </Slide>
        ))}
      </TransitionGroup>
    </Box>
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
