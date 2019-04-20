import React from 'react';
import * as PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function ConfirmDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <DialogTitle>{props.title}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {props.children}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={props.onClose}
          color="primary"
        >
          Cancel
        </Button>

        <Button
          onClick={props.onConfirm}
          color="primary"
        >
          {props.confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
};

ConfirmDialog.defaultProps = {
  confirmText: 'Confirm',
};

export default ConfirmDialog;
