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
  namespace,
  // saveUser,
} from '../../state/ducks/pages/users';
import { pendingSelector } from '../../state/selectors';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
export const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const maxLength15 = maxLength(15);
const minLength10 = minLength(10);

function UserField(props) {
  return (
    <TextField
      inputProps={props.input}
      label={props.label}
      fullWidth
      variant="filled"
      error={props.meta.invalid}
      helperText={props.meta.error}
    />
  );
}

UserField.propTypes = {
  ...fieldPropTypes,
  label: PropTypes.string.isRequired,
};

function UserDialog(props) {
  const [user, setUser] = React.useState(props.user || {});

  React.useEffect(() => setUser(props.user || {}), [props.user]);

  const onClose = () => props.dispatch(closeUser());

  // const submit = validate => (e) => {
  //   e.preventDefault();
  //
  //   if (validate() && !props.isSubmitting) {
  //     props.dispatch(saveUser(user));
  //   }
  // };

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
      <DialogContent dividers>
        <Box py={2}>
          <Form noValidate onSubmit={props.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Field
                  name="firstName"
                  component={UserField}
                  props={{
                    label: 'First Name',
                  }}
                  validate={[required, minLength10, maxLength15]}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Field
                  name="lastName"
                  component={UserField}
                  props={{
                    label: 'Last Name',
                  }}
                />
              </Grid>
            </Grid>
          </Form>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Dismiss
        </Button>

        <Button
          color="primary"
          disabled={props.isSubmitting}
          type="submit"
          onSubmit={props.handleSubmit}
        >
          {props.isSubmitting ? 'Saving' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UserDialog.propTypes = {
  ...formPropTypes,
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
    initialValues: users.user,
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: '@page/users/user',
  enableReinitialize: true,
})(UserDialog));
