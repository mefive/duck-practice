import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { closeUser, namespace, saveUser } from '../../state/ducks/pages/users';
import Form from '../../components/Form';
import { pendingSelector } from '../../state/selectors';

function UserDialog(props) {
  const [user, setUser] = React.useState(props.user || {});

  React.useEffect(() => setUser(props.user || {}), [props.user]);

  const onClose = () => props.dispatch(closeUser());

  const submit = validate => () => {
    if (validate() && !props.isSubmitting) {
      props.dispatch(saveUser(user));
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle
        onClose={onClose}
      >
        {user.id ? 'Modify' : 'New'}
        &nbsp;User
      </DialogTitle>

      <Form
        dataSource={user}
        onChange={(key, value) => setUser({
          ...user,
          [key]: value,
        })}
      >
        {({ getFieldDecorator, validate, errors }) => (
          <React.Fragment>
            <DialogContent dividers>
              <form onSubmit={submit(validate)}>
                {getFieldDecorator('firstName', {
                  rules: [{
                    required: true,
                  }],
                })((
                  <TextField
                    required
                    label="First Name"
                    fullWidth
                    error={'firstName' in errors}
                    helperText={errors.firstName}
                  />
                ))}

                <Box m={2} />

                {getFieldDecorator('lastName', {
                  rules: [{
                    required: true,
                  }],
                })((
                  <TextField
                    required
                    label="Last Name"
                    fullWidth
                  />
                ))}

                <Box m={2} />

                {getFieldDecorator('age', {
                  rules: [{
                    required: true,
                  }],
                })((
                  <TextField
                    required
                    label="Age"
                    fullWidth
                  />
                ))}

                <Box m={2} />

                {getFieldDecorator('phone', {
                  rules: [{
                    required: true,
                  }],
                })((
                  <TextField
                    required
                    label="Phone"
                    fullWidth
                  />
                ))}

                <Box m={2} />
              </form>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>
                Dismiss
              </Button>

              <Button
                onClick={submit(validate)}
                color="primary"
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? 'Saving' : 'Save'}
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Form>
    </Dialog>
  );
}

UserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  user: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

UserDialog.defaultProps = {
  user: null,
};

const mapStateToProps = (state) => {
  const { users } = state.pages;

  return {
    open: users.open,
    user: users.user,
    isSubmitting: pendingSelector(state, namespace, 'SAVE_USER'),
  };
};


export default connect(mapStateToProps)(UserDialog);
