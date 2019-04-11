import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';

import { fetchData } from '../redux/pages/users';

class Users extends React.PureComponent {
  static propTypes = {
    users: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.props.dispatch(fetchData);
  }

  render() {
    return (
      <Paper>
        <Box p={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.props.isLoading
                ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Box
                        minHeight={300}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        Loading...
                      </Box>
                    </TableCell>
                  </TableRow>
                )
                : this.props.users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>
                      <Avatar src={user.avatar}  component="div" />
                    </TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    )
  }
}

const usersSelector
  = createSelector(
    (users, ids) => ids.map(id => users[id]),
    users => users.filter(user => user != null),
  );

const mapStateToProps = ({ modules, pages }) => ({
  users: usersSelector(modules.users, pages.users.ids),
  isLoading: pages.users.isLoading,
});

export default connect(mapStateToProps)(Users);
