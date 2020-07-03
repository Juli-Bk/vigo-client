import {
  Box,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  List,
  ListItem,
  TableRow, Typography
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '../../../helpers/helpers';
import useStyles from './ProductsTableStyles';

const ProductsTable = (props) => {
  const {productsData} = props;
  const classes = useStyles();
  return (
    <List>
      {productsData.map(row => (
        <ListItem key={row.name + row.size}>
          <Table aria-label="products table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" className={classes.firstCell}>
                  <CardMedia image={row.imgUrl} className={classes.img}/>
                  <Box className={classes.textBox}>
                    <Link to={`/products/${row._id}`}
                      className={classes.name}>{capitalize(row.name)}</Link>
                    <Typography className={classes.details}>
                          Color: <span className={classes.boldText}>{row.color}</span>
                    </Typography>
                    <Typography className={classes.details}>
                          Size: <span className={classes.boldText}>{row.size}</span></Typography>
                    <Typography className={classes.details}>
                      Price: <span className={classes.boldText}>${row.price}</span></Typography>
                    <Typography className={classes.details}>
                          Quantity: <span className={classes.boldText}>{row.quantity}</span></Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ListItem>
      ))}
    </List>
  );
};

export default React.memo(ProductsTable);