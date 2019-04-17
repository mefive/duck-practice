import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Field, reduxForm, Form, formPropTypes, fieldPropTypes,
} from 'redux-form';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';

import {
  closeUser,
  saveUser,
} from '../../state/ducks/pages/users';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

function UserField(props) {
  const { input, meta, label } = props;
  const invalid = meta.touched && meta.invalid;

  return (
    <TextField
      inputProps={input}
      value={input.value}
      label={label}
      fullWidth
      variant="outlined"
      error={invalid}
      helperText={meta.touched && meta.error}
    />
  );
}

UserField.propTypes = {
  ...fieldPropTypes,
  label: PropTypes.string.isRequired,
};

function UserDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      fullWidth
    >
      <DialogTitle
        onClose={props.close}
      >
        &nbsp;User
      </DialogTitle>
      <DialogContent dividers>
        <Box py={2}>
          <Form noValidate onSubmit={props.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Field
                  name="firstName"
                  component={UserField}
                  label="First Name"
                  validate={[required]}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Field
                  name="lastName"
                  component={UserField}
                  label="Last Name"
                  validate={[required]}
                />
              </Grid>

              <Grid item md={6} x={12}>
                <Field
                  name="age"
                  component={UserField}
                  label="Age"
                  validate={[required]}
                />
              </Grid>

              <Grid item md={6} x={12}>
                <Field
                  name="phone"
                  component={UserField}
                  label="Phone"
                  validate={[required]}
                />
              </Grid>
            </Grid>

            <input type="submit" css="display: none" />
          </Form>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.close}>
          Dismiss
        </Button>

        <Button
          color="primary"
          disabled={props.submitting}
          type="submit"
          onClick={props.handleSubmit}
        >
          {props.submitting ? 'Saving' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UserDialog.propTypes = {
  ...formPropTypes,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { users } = state.pages;

  return {
    open: users.open,
    initialValues: users.user && { ...users.user, open: users.open },
  };
};

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(closeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: '@page/users/user',
  enableReinitialize: true,
  onSubmit: (user, dispatch) => dispatch(saveUser(user)),
})(UserDialog));
