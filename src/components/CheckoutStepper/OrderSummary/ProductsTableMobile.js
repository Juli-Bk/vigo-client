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
          <TableCell align="center" className={tableClasses.tableHead}>{productsData.length} products</TableCell>
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
                <Typography className={tableClasses.details}>Color:
                  <span className={tableClasses.boldText}>{row.color}</span></Typography>
                <Typography className={tableClasses.details}>Size:
                  <span className={tableClasses.boldText}>{row.size}</span></Typography>
                <Typography className={tableClasses.details}>Quantity:
                  <span className={tableClasses.boldText}>{row.quantity}</span></Typography>
                <Typography className={tableClasses.details}>Unit Price:
                  <span className={tableClasses.boldText}>{row.price}</span></Typography>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default React.memo(ProductsTableDesktop);