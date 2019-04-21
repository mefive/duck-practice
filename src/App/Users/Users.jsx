import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  Paper, Avatar,
  Button, IconButton,
  CardActions, CardContent, CardHeader,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';

import Table from '../../components/Table';

import {
  deletingCancel,
  deletingRequest,
  deleteUserRequest,
  loadDataRequest,
  namespace,
  openUser,
} from '../../state/ducks/view/users';
import UserDialog from './UserDialog';
import { getLoading } from '../../state/ducks/loading';
import ConfirmDialog from '../../components/ConfirmDialog';

class Users extends React.PureComponent {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatar: PropTypes.string,
      age: PropTypes.number,
      phone: PropTypes.string,
    })).isRequired,
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    deletingUser: PropTypes.shape({}),
    isDeleting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    deletingUser: null,
  };

  constructor(props) {
    super(props);

    const { page, rowsPerPage } = this.props;

    this.loadData(page, rowsPerPage);
  }

  loadData(page, size) {
    if (!this.props.isLoading) {
      this.props.dispatch(loadDataRequest({ page, size }));
    }
  }

  render() {
    const {
      users, isLoading, page, rowsPerPage, count, dispatch, deletingUser, isDeleting,
    } = this.props;

    return (
      <Paper>
        <CardHeader title="Users" />
        <CardActions>
          <Button
            color="primary"
            onClick={() => dispatch(openUser(null))}
          >
              New
          </Button>
        </CardActions>
        <CardContent>
          <Table
            rowKey="id"
            dataSource={users}
            columns={[{
              dataKey: 'firstName',
              label: 'First Name',
            }, {
              dataKey: 'lastName',
              label: 'Last Name',
            }, {
              dataKey: 'avatar',
              label: 'Avatar',
              cellRenderer: record => (
                <Avatar src={record.avatar} />
              ),
            }, {
              dataKey: 'age',
              label: 'Age',
            }, {
              dataKey: 'phone',
              label: 'Phone',
            }, {
              dataKey: 'actions',
              label: 'Actions',
              align: 'center',
              cellRenderer: user => (
                <React.Fragment>
                  <IconButton onClick={() => dispatch(openUser(user.id))}>
                    <EditIcon />
                  </IconButton>

                  <IconButton onClick={() => dispatch(deletingRequest(user.id))}>
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              ),
            }]}
            pagination={{
              page,
              onChangePage: (e, p) => this.loadData(p, rowsPerPage),
              onChangeRowsPerPage: e => this.loadData(page, e.target.value),
              count,
              rowsPerPage,
              rowsPerPageOptions: [5, 10, 20],
            }}
            isLoading={isLoading}
            height={395}
          />
        </CardContent>

        <UserDialog />

        <ConfirmDialog
          onClose={() => dispatch(deletingCancel())}
          open={deletingUser != null}
          onConfirm={() => dispatch(deleteUserRequest(deletingUser.id))}
          title="Delete User"
          confirmText={isDeleting ? 'Deleting' : 'Delete'}
        >
          Are you sure you want to delete
          {' '}
          {deletingUser && (
            <Box component="span" fontWeight={600}>
              {deletingUser.firstName}
            </Box>
          )}
          ?
        </ConfirmDialog>
      </Paper>
    );
  }
}

const usersSelector = createSelector(
  (users, ids) => ids.map(id => users[id]),
  users => users.filter(user => user != null),
);

const mapStateToProps = (state) => {
  const { view, dao } = state;

  return {
    users: usersSelector(dao.users, view.users.ids),
    isLoading: getLoading(state, namespace, 'LOAD_DATA'),
    page: view.users.page,
    count: view.users.total,
    rowsPerPage: view.users.size,
    deletingUser: dao.users[view.users.deletingId],
    isDeleting: getLoading(state, namespace, 'DELETE_USER'),
  };
};

export default connect(mapStateToProps)(Users);
