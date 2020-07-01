import React, { useCallback, useEffect, useMemo } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { Box, ThemeProvider, TableContainer, Grid } from '@material-ui/core';

import { setStorageData } from '../../helpers/helpers';
import {
  findItemsInCart,
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

  const getCartData = useCallback((product) => {
    const itemsInCart = findItemsInCart(product._id, shoppingCart);
    console.log('itemsInCart', itemsInCart);
    const itemStockData = getItemStockData(productsQuantity, product._id);
    console.log('itemStockData', itemStockData);
    const items = getChosenProductData(itemStockData, itemsInCart);
    console.log('items', items);

    const productsData = [];
    items.forEach((item, index) => {
      productsData.push({
        imgUrl: product.imageUrls[0],
        name: product.name,
        size: item && item.sizeId.name,
        color: item && item.colorId.name,
        productCode: product.productId,
        price: product.price,
        id: product._id,
        salePrice: product.salePrice,
        isOnSale: product.isOnSale,
        quantity: itemsInCart[index] && itemsInCart[index].cartQuantity,
        totalQuantity: item && item.quantity
      });
    });
    return productsData;
  }, [shoppingCart, productsQuantity]);

  const getRows = useCallback((products) => {
    const rows = [];
    if (products.length && productsQuantity.length) {
      products.forEach(product => {
        const productData = getCartData(product);
        rows.push(productData);
      });
    }
    console.log(rows);
    return rows;
  }, [getCartData, productsQuantity.length]);

  const rows = getRows(products);

  const subTotal = getTotalSum(rows);

  return (
    <ThemeProvider theme={theme}>
      {shoppingCart.length && productsQuantity.length && products.length &&
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