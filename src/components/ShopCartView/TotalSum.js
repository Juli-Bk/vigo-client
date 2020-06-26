import React from 'react';
import {Box, makeStyles, Button, TableRow, Table, TableBody, TableCell} from '@material-ui/core';
import {Link} from 'react-router-dom';
import tableStyles from '../WishListView/WishListViewStyles';
import {colors} from '../../styles/colorKit';

const useStyles = makeStyles(theme => ({
  container: {

  },
  subtotal: {

  },
  total: {

  },
  headCell: {
    borderRight: `1px solid ${colors.thinLine}`
  }
}));

const TotalSum = (props) => {
  const {subtotal, tax, shipping} = props;
  const classes = useStyles();
  const tableClasses = tableStyles();

  const total = subtotal + shipping + tax;

  return (
    <Box>
      <Table>
        <TableBody>
          <TableRow className={tableClasses.tableRow}>
            <TableCell className={classes.headCell}>
                Subtotal:
            </TableCell>
            <TableCell>
                ${subtotal}
            </TableCell>
          </TableRow>
          <TableRow className={tableClasses.tableRow}>
            <TableCell className={classes.headCell}>
              Shipping (0%):
            </TableCell>
            <TableCell>
              ${shipping}
            </TableCell>
          </TableRow>
          <TableRow className={tableClasses.tableRow}>
            <TableCell className={classes.headCell}>
              Tax (0%):
            </TableCell>
            <TableCell>
              ${tax}
            </TableCell>
          </TableRow>
          <TableRow className={tableClasses.tableRow}>
            <TableCell className={classes.headCell}>
             Total:
            </TableCell>
            <TableCell>
              ${total}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button><Link to={'/checkout'}>Checkout</Link></Button>
    </Box>
  );
};

export default TotalSum;