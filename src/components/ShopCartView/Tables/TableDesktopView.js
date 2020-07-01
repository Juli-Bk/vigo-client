import { Box, CardMedia, Table, TableCell, TableRow, Typography, TableHead, TableBody} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { capitalize } from '../../../helpers/helpers';
import {getSubtotal} from '../../../pages/ShoppingCart/cartHelpers';
import { Link } from 'react-router-dom';
import Quantity from '../../Product/Quantity/Quantity';
import React from 'react';
import SaleInfoBox from '../../Product/SaleInfoBox/SaleInfoBox';
import SalePrice from '../../Product/SalePrice/SalePrice';

const TableDesktopView = (props) => {
  const { rows, classes, handleQuantity, deleteFromShopCart } = props;

  return (
    <Table aria-label="products table">
      <TableHead style={{verticalAlign: 'middle'}}>
        <TableRow>
          <TableCell align="center" className={classes.tableHead}>Product name</TableCell>
          <TableCell align="center" className={classes.tableHead}>Unit Price</TableCell>
          <TableCell align="center" className={classes.tableHead}>Quantity</TableCell>
          <TableCell align="center" className={classes.tableHead}>Subtotal</TableCell>
          <TableCell align="center" className={classes.tableHead}>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id + row.size} className={classes.tableRow}>
            <TableCell component="th" scope="row" className={classes.firstCell}>
              <Link to={`/products/${row.id}`} className={classes.linkBox}>
                <CardMedia image={row.imgUrl} className={classes.img}/>
                {row.isOnSale
                  ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
              </Link>
              <Box className={classes.textBox}>
                <Link to={`/products/${row.id}`}
                  className={classes.name}>{capitalize(row.name)}</Link>
                <Typography className={classes.details}>
                          Color: <span className={classes.boldText}>{row.color}</span>
                </Typography>
                <Typography className={classes.details}>
                          Size: <span className={classes.boldText}>{row.size}</span></Typography>
                <Typography className={classes.details}>
                          Product code: <span className={classes.boldText}>{row.productCode}</span>
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="center" className={classes.code}>
              <SalePrice value={row.salePrice}/>
            </TableCell>
            <TableCell align="center" className={classes.code}>
              <Quantity
                quantity={row.quantity}
                max={row.totalQuantity}
                id={row.id}
                classes={classes}
                handleQuantity={handleQuantity}
              />
            </TableCell>
            <TableCell align="center" className={classes.code}>
              <SalePrice value={getSubtotal(row.salePrice, row.quantity)}/>
            </TableCell>
            <TableCell align="center">
              <CloseIcon data-testid='deleteIcon'
                className={classes.closeIcon}
                onClick={() => {
                  deleteFromShopCart(row.id);
                }}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableDesktopView;