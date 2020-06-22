import { Box, CardMedia, Table, TableCell, Typography, TableHead, TableBody, TableRow } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { capitalize, formPriceString, getSubtotal } from '../../../helpers/helpers';
import { Link } from 'react-router-dom';
import globalConfig from '../../../globalConfig';
import Quantity from '../../Product/Quantity/Quantity';
import React from 'react';

const TableMobileView = (props) => {
  const {rows, classes, getCartData, handleQuantity, productsAmount, deleteFromShopCart} = props;
  return (
    <Table aria-label="products table">
      <TableHead>
        <TableCell align="center" className={classes.tableHead}>
          {productsAmount} products in your Cart
        </TableCell>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id} className={classes.tableRow}>
            <TableCell component="th" scope="row" className={classes.firstCell}>
              <Box className={classes.linkBox}>
                <CardMedia image={row.imgUrl} className={classes.img}/>
                <CloseIcon
                  data-testid='deleteIcon'
                  className={classes.closeIcon}
                  onClick={() => {
                    deleteFromShopCart(row.id);
                  }}/>
              </Box>
              <Box className={classes.textBox}>
                <Link to={`/products/${row.id}`}
                  className={classes.name}>{capitalize(row.mainData.name)}</Link>
                <Typography className={classes.details}>Color: {row.mainData.color}</Typography>
                <Typography className={classes.details}>Size: {row.mainData.size}</Typography>
                <Typography className={classes.details}>Product code: <span className={classes.codeSmall}>{row.productCode}</span>
                </Typography>
                <Typography variant='caption' component='p' className={classes.details}>
                      Sale price: <span className={classes.salePrice}>
                    {formPriceString(row.salePrice, globalConfig.priceIsInteger)}
                  </span>
                </Typography>
                <Quantity
                  quantity={row.quantity}
                  max={getCartData(row.id).totalQuantity}
                  id={row.id}
                  classes={classes}
                  handleQuantity={handleQuantity}
                />
                <Typography variant='caption' component='p' className={classes.details}>
                      Subtotal: <span className={classes.salePrice}>
                                    ${getSubtotal(row.salePrice, row.quantity)}
                  </span>
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableMobileView;