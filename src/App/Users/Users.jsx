import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Paper, Avatar, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import Table from '../../components/Table';

import { loadData, namespace, openUser } from '../../state/ducks/pages/users';
import UserDialog from './UserDialog';
import { getPending } from '../../state/ducks/pending';

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
  };

  constructor(props) {
    super(props);

    const { page, rowsPerPage } = this.props;

    this.loadData(page, rowsPerPage);
  }

  loadData(page, size) {
    this.props.dispatch(loadData({ page, size }));
  }

  render() {
    const {
      users, isLoading, page, rowsPerPage, count, dispatch,
    } = this.props;

    return (
      <Paper>
        <Box p={2} pb={0}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(openUser())}
          >
            New
          </Button>
        </Box>

        <Box p={2}>
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
                <Button onClick={() => dispatch(openUser(user))}>
                  Modify
                </Button>
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
        </Box>

        <UserDialog />
      </Paper>
    );
  }
}

const usersSelector = createSelector(
  (users, ids) => ids.map(id => users[id]),
  users => users.filter(user => user != null),
);

const mapStateToProps = (state) => {
  const { pages, users } = state;

  return {
    users: usersSelector(users, pages.users.ids),
    isLoading: getPending(state, namespace, 'LOAD_DATA'),
    page: pages.users.page,
    count: pages.users.total,
    rowsPerPage: pages.users.size,
  };
};

export default connect(mapStateToProps)(Users);
