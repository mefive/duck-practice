import React from 'react';
import * as PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import MuiTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Central from './Central';

class Table extends React.PureComponent {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string,
      cellRenderer: PropTypes.func,
      headerRenderer: PropTypes.func,
      align: PropTypes.string,
    })).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    pagination: PropTypes.shape(TablePagination.propTypes),
    rowKey: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    pagination: null,
    rowKey: null,
    height: null,
    isLoading: false,
  };

  get dataSource() {
    const { dataSource, pagination } = this.props;

    if (pagination == null
      || pagination.rowsPerPage == null
      || dataSource.length <= pagination.rowsPerPage
    ) {
      return dataSource;
    }

    const start = pagination.page * pagination.rowsPerPage;

    return dataSource.slice(
      start,
      start + pagination.rowsPerPage,
    );
  }

  render() {
    const {
      columns, rowKey, pagination, height, isLoading,
    } = this.props;
    const { dataSource } = this;

    return (
      <Box display="flex" flexDirection="column">
        <Box position="relative" flex={1} minHeight={height}>
          <MuiTable>
            <TableHead>
              <TableRow>
                {columns.map(col => (
                  <TableCell align={col.align} key={col.dataKey}>
                    {col.headerRenderer ? col.headerRenderer(col) : col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {dataSource.map((row, rowIndex) => (
                <TableRow key={rowKey ? row[rowKey] : rowIndex}>
                  {columns.map(col => (
                    <TableCell align={col.align} key={col.dataKey}>
                      {col.cellRenderer ? col.cellRenderer(row) : row[col.dataKey]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>

          {isLoading && (
            <Central
              css="
                background-color: #FFF;
                opacity: .8;
                filter: blur(0.5px);
                transition: opacity .2s;
              "
            >
              <CircularProgress />
            </Central>
          )}
        </Box>

        {pagination && (
          <Box mt={2}>
            <TablePagination
              component="div"
              {...pagination}
            />
          </Box>
        )}
      </Box>
    );
  }
}

export default Table;
