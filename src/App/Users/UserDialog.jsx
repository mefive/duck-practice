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

import { closeUser, saveUser } from '../../state/ducks/pages/users';
import Form from '../../components/Form';

function UserDialog(props) {
  const [user, setUser] = React.useState(props.user);

  React.useEffect(() => setUser(props.user), [props.user]);

  const onClose = () => props.dispatch(closeUser());

  return (
    <Dialog
      open={props.open}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle
        onClose={onClose}
      >
        New User
      </DialogTitle>

      <Form
        dataSource={user}
        onChange={(key, value) => setUser({
          ...user,
          [key]: value,
        })}
      >
        {({ getFieldDecorator }) => (
          <React.Fragment>
            <DialogContent dividers>
              <form>
                {getFieldDecorator('firstName', {
                  rules: [{
                    required: true,
                  }],
                })((
                  <TextField
                    required
                    label="First Name"
                    fullWidth
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
                onClick={() => props.dispatch(saveUser(user))}
                color="primary"
              >
                Save
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
};

UserDialog.defaultProps = {
  user: null,
};

const mapStateToProps = ({ pages }) => ({
  open: pages.users.open,
  user: pages.users.user,
});

export default connect(mapStateToProps)(UserDialog);
