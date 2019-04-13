import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

import Table from '../components/Table';

import { loadData, namespace } from '../state/ducks/pages/users';
import { pendingSelector } from '../state/selectors';

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

    props.dispatch(loadData(page, rowsPerPage));
  }

  render() {
    const {
      users, isLoading, page, rowsPerPage, dispatch, count,
    } = this.props;

    return (
      <Paper>
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
            }]}
            pagination={{
              page,
              onChangePage: (e, p) => dispatch(loadData(p, rowsPerPage)),
              onChangeRowsPerPage: e => dispatch(loadData(page, e.target.value)),
              count,
              rowsPerPage,
              rowsPerPageOptions: [5, 10, 20],
            }}
            isLoading={isLoading}
          />
        </Box>
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
    isLoading: pendingSelector(state, namespace, 'LOAD_DATA'),
    page: pages.users.page,
    count: pages.users.total,
    rowsPerPage: pages.users.size,
  };
};

export default connect(mapStateToProps)(Users);
