import React, { useCallback, useEffect, useMemo } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { Box, ThemeProvider, TableContainer, Grid } from '@material-ui/core';

import { setStorageData } from '../../helpers/helpers';
import {
  findItemInCart,
  getChosenProductData,
  getItemStockData,
  updateCartData,
  updateProductQuantity,
  addToCart,
  deleteFromCart, getTotalSum
} from '../../pages/ShoppingCart/cartHelpers';

import {changeShoppingCart} from '../../redux/actions/shopCart';
import {getProductsQuantity} from '../../redux/actions/quantity';
import {theme} from '../WishListView/WishListViewTheme';
import useStyles from '../WishListView/WishListViewStyles';
import TableMobileView from './Tables/TableMobileView';
import TableDesktopView from './Tables/TableDesktopView';
import TotalSum from './TotalSum/TotalSum';

const ShopCartView = (props) => {
  const {isMobile, products, changeShoppingCart, shoppingCart, productsQuantity, getProductsQuantity} = props;
  const classes = useStyles();

  useEffect(() => {
    const idArray = [];
    products.forEach(product => {
      idArray.push(product._id);
    });
    getProductsQuantity(idArray);
  }, [getProductsQuantity, products]);

  const deleteFromShopCart = (id) => {
    deleteFromCart(id);
    changeShoppingCart();
  };

  const handleQuantity = (id, number) => {
    const updatedProduct = updateProductQuantity(id, number, shoppingCart);
    const updatedCart = updateCartData(shoppingCart, id, updatedProduct);

    setStorageData('shoppingCart', updatedCart);
    changeShoppingCart();
    addToCart(id, number, updatedProduct.sizeId);
  };

  const getCartData = useCallback((productId) => {
    const itemInCart = findItemInCart(productId, shoppingCart);
    const itemStockData = getItemStockData(productsQuantity, productId);
    const item = getChosenProductData(itemStockData, itemInCart);

    return {
      size: item && item.sizeId.name,
      quantity: itemInCart && itemInCart.cartQuantity,
      color: item && item.colorId.name,
      totalQuantity: item && item.quantity
    };
  }, [shoppingCart, productsQuantity]);

  const rows = products.map(product => {
    return {
      imgUrl: product.imageUrls[0],
      name: product.name,
      color: getCartData(product._id).color,
      size: getCartData(product._id).size,
      productCode: product.productId,
      price: product.price,
      id: product._id,
      salePrice: product.salePrice,
      isOnSale: product.isOnSale,
      quantity: getCartData(product._id).quantity
    };
  });

  const subTotal = useMemo(() => getTotalSum(rows), [rows]);

  return (
    <ThemeProvider theme={theme}>
      {shoppingCart.length && products.length &&
              <Grid container direction='column' justify='center'>
                <Grid item>
                  <TableContainer component={Box}>
                    { isMobile
                      ? <TableMobileView
                        classes={classes}
                        handleQuantity={handleQuantity}
                        getCartData={getCartData}
                        rows={rows}
                        deleteFromShopCart={deleteFromShopCart}
                        productsAmount={products.length}
                      />
                      : <TableDesktopView
                        classes={classes}
                        handleQuantity={handleQuantity}
                        getCartData={getCartData}
                        rows={rows}
                        deleteFromShopCart={deleteFromShopCart}
                      />}
                  </TableContainer>
                </Grid>
                <Grid item>
                  <TableContainer component={Box}>
                    <TotalSum subtotal={subTotal}/>
                  </TableContainer>
                </Grid>
              </Grid>
      }
    </ThemeProvider>
  );
};

ShopCartView.propTypes = {
  products: PropTypes.array.isRequired,
  shoppingCart: PropTypes.array,
  changeShoppingCart: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  productsQuantity: PropTypes.array.isRequired,
  getProductsQuantity: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    shoppingCart: store.shoppingCart,
    productsQuantity: store.quantity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeShoppingCart: () => dispatch(changeShoppingCart()),
    getProductsQuantity: idArray => dispatch(getProductsQuantity(idArray))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ShopCartView));