import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {
  Box, Typography, CardMedia, ThemeProvider,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import {
  capitalize,
  formPriceString,
  getStorageData,
  deleteFromCart,
  setStorageData,
  addToCart
} from '../../helpers/helpers';
import AjaxUtils from '../../ajax';
import { changeShoppingCart } from '../../redux/actions/actions';
import SaleInfoBox from '../Product/SaleInfoBox/SaleInfoBox';
import SalePrice from '../Product/SalePrice/SalePrice';
import Quantity from '../Product/Quantity/Quantity';
import { theme } from '../WishListView/WishListTableTheme';
import useStyles from '../WishListView/WishListTableStyles';
import globalConfig from '../../globalConfig';

const ShopCartView = (props) => {
  // todo max quantity
  const {isMobile, products, changeShoppingCart, shoppingCart } = props;
  const classes = useStyles();

  const handleQuantity = (id, number) => {
    const productToChange = shoppingCart.find(item => item.productId === id);
    productToChange.cartQuantity = number;
    changeShoppingCart([...shoppingCart.filter(item => item.productId !== id), productToChange]);
    setStorageData('shoppingCart', [...shoppingCart.filter(item => item.productId !== id), productToChange]);
    addToCart(id, number);
  };

  const getSubtotal = (price, quantity) => {
    return quantity ? price * quantity : price;
  };

  const deleteFromShopCart = (id) => {
    deleteFromCart(id);
    changeShoppingCart(getStorageData('shoppingCart'));
  };

  const rows = products.map(product => {
    return {
      imgUrl: product.imageUrls[0],
      mainData: {
        name: product.name,
        color: product.color,
        size: shoppingCart.find(item => item.productId === product._id).size || ''
      },
      productCode: product.productId,
      price: product.price,
      id: product._id,
      salePrice: product.salePrice,
      isOnSale: product.isOnSale,
      quantity: shoppingCart.find(item => item.productId === product._id).cartQuantity || 1
    };
  });

  return (
    <ThemeProvider theme={theme}>
      {shoppingCart.length && products.length &&
                <TableContainer component={Box}>
                  <Table aria-label="products table">
                    <TableHead>
                      { isMobile
                        ? <TableRow>
                          <TableCell align="center" className={classes.tableHead}>
                            {products.length} products in your Cart
                          </TableCell>
                        </TableRow>
                        : <TableRow>
                          <TableCell align="center" className={classes.tableHead}>Product name</TableCell>
                          <TableCell align="center" className={classes.tableHead}>Product code</TableCell>
                          <TableCell align="center" className={classes.tableHead}>Unit Price</TableCell>
                          <TableCell align="center" className={classes.tableHead}>Quantity</TableCell>
                          <TableCell align="center" className={classes.tableHead}>Subtotal</TableCell>
                          <TableCell align="center" className={classes.tableHead}>Delete</TableCell>
                        </TableRow> }
                    </TableHead>
                    <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.id} className={classes.tableRow}>
                          { isMobile
                            ? <TableCell component="th" scope="row" className={classes.firstCell}>
                              <Box className={classes.linkBox}>
                                <CardMedia image={row.imgUrl} className={classes.img}/>
                                <CloseIcon
                                  data-testid='deleteIcon'
                                  className={classes.closeIcon}
                                  onClick={() => {
                                    deleteFromCart(row.id);
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
                              </Box>
                            </TableCell>
                            : <>
                              <TableCell component="th" scope="row" className={classes.firstCell}>
                                <Link to={`/products/${row.id}`} className={classes.linkBox}>
                                  <CardMedia image={row.imgUrl} className={classes.img}/>
                                  {row.isOnSale
                                    ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
                                </Link>
                                <Box className={classes.textBox}>
                                  <Link to={`/products/${row.id}`}
                                    className={classes.name}>{capitalize(row.mainData.name)}</Link>
                                  <Typography className={classes.details}>Color: {row.mainData.color}</Typography>
                                  <Typography className={classes.details}>Size: {row.mainData.size}</Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="center" className={classes.code}>{row.productCode}</TableCell>
                              <TableCell align="center" className={classes.code}>
                                <SalePrice value={row.salePrice}/>
                              </TableCell>
                              <TableCell align="center" className={classes.code}>
                                <Quantity
                                  quantity={row.quantity}
                                  max={5}
                                  id={row.id}
                                  classes={classes}
                                  handleQuantity={handleQuantity}
                                />
                              </TableCell>
                              <TableCell align="center" className={classes.code}>
                                <SalePrice isSubtotal={true}
                                  value={getSubtotal(row.salePrice, row.quantity)}/>
                              </TableCell>
                              <TableCell align="center">
                                <CloseIcon data-testid='deleteIcon'
                                  className={classes.closeIcon}
                                  onClick={() => {
                                    deleteFromShopCart(row.id);
                                  }}/>
                              </TableCell>
                            </>
                          }
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
      }
    </ThemeProvider>
  );
};

ShopCartView.propTypes = {
  products: PropTypes.array.isRequired,
  shoppingCart: PropTypes.array,
  changeShoppingCart: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  return {
    shoppingCart: store.shoppingCart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeShoppingCart: data => dispatch(changeShoppingCart(data))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ShopCartView));