import { withStyles } from '@material-ui/styles';
import { TableRow, TableCell } from '@material-ui/core';

export const StyledTableCell = withStyles((theme) => ({

  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: '1px solid #e0e0e0'
  },
  body: {
    fontSize: 14,
    border: '1px solid #e0e0e0'
  }
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);