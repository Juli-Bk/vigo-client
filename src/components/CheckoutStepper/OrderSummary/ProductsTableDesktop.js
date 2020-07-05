import {
  Box, CardMedia,
  Table, TableBody, TableCell,
  TableRow, Typography, TableHead
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '../../../helpers/helpers';
import useStyles from './ProductsTableStyles';
import tableStyles from '../../WishListView/WishListViewStyles';

const ProductsTableDesktop = (props) => {
  const {productsData} = props;
  const classes = useStyles();
  const tableClasses = tableStyles();
  return (
    <Table aria-label="products table" className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell align="center" className={tableClasses.tableHead}>Product name</TableCell>
          <TableCell align="center" className={tableClasses.tableHead}>Color</TableCell>
          <TableCell align="center" className={tableClasses.tableHead}>Size</TableCell>
          <TableCell align="center" className={tableClasses.tableHead}>Quantity</TableCell>
          <TableCell align="center" className={tableClasses.tableHead}>Unit price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {productsData.map(row => (
          <TableRow key={row.name + row.size}>
            <TableCell component="th" scope="row" className={tableClasses.firstCell}>
              <CardMedia image={row.imgUrl} className={classes.img}/>
              <Box className={tableClasses.textBox}>
                <Link to={`/products/${row.id}`}
                  className={tableClasses.name}>{capitalize(row.name)}</Link>
              </Box>
            </TableCell>
            <TableCell component="th" scope="row" align="center" >
              <Typography className={classes.details}>{row.color}</Typography>
            </TableCell>
            <TableCell component="th" scope="row" align="center" >
              <Typography className={classes.details}>{row.size}</Typography>
            </TableCell>
            <TableCell component="th" scope="row" align="center" >
              <Typography className={classes.details}>{row.quantity}</Typography>
            </TableCell>
            <TableCell component="th" scope="row" align="center" >
              <Typography className={classes.details}>${row.price}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default React.memo(ProductsTableDesktop);