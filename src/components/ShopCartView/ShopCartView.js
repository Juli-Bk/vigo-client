import React, { useCallback, useEffect, useMemo } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Box, ThemeProvider, TableContainer, Grid} from '@material-ui/core';

import {
  findItemsInCart,
  getChosenProductData,
  getItemStockData,
  updateProductQuantity,
  deleteFromCart,
  updateCartData,
  getTotalSum,
  addToCart
} from '../../pages/ShoppingCart/cartHelpers';

import {changeShoppingCart} from '../../redux/actions/shopCart';
import {getProductsQuantity} from '../../redux/actions/quantity';
import {theme} from '../WishListView/WishListViewTheme';
import useStyles from '../WishListView/WishListViewStyles';
import TableMobileView from './Tables/TableMobileView';
import TableDesktopView from './Tables/TableDesktopView';
import TotalSum from './TotalSum/TotalSum';

const ShopCartView = (props) => {
  const {
    isMobile,
    products,
    changeShoppingCart,
    shoppingCart,
    productsQuantity,
    getProductsQuantity
  } = props;
  const classes = useStyles();

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      const idArray = [];
      products.forEach(product => {
        idArray.push(product._id);
      });
      getProductsQuantity(idArray);
    }
    return () => {
      isCanceled = true;
    };
  }, [getProductsQuantity, products]);

  const deleteFromShopCart = useCallback((productId, sizeId) => {
    deleteFromCart(productId, sizeId);
    changeShoppingCart();
  }, [changeShoppingCart]);

  const handleQuantity = useCallback((productId, number, sizeId) => {
    const updatedProduct = updateProductQuantity(productId, number, shoppingCart, sizeId);
    updateCartData(shoppingCart, productId, updatedProduct, sizeId);
    changeShoppingCart();
    addToCart(productId, number, updatedProduct.sizeId, updatedProduct.colorId);
  }, [changeShoppingCart, shoppingCart]);

  const getCartData = useCallback(product => {
    const itemsInCart = findItemsInCart(product._id, shoppingCart);
    const itemStockData = getItemStockData(productsQuantity, product._id);
    const items = getChosenProductData(itemStockData, itemsInCart);

    const productsData = [];
    items.forEach((item, index) => {
      productsData.push({
        imgUrl: product.imageUrls[0],
        name: product.name,
        size: item && item.sizeId.name,
        sizeId: item && item.sizeId._id,
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
    if (products.length && productsQuantity.length && shoppingCart.length) {
      products.forEach(product => {
        const productData = getCartData(product);
        rows.push(...productData);
      });
    }
    return rows;
  }, [getCartData, productsQuantity.length, shoppingCart.length]);

  const rows = useMemo(() => getRows(products), [getRows, products]);

  const subTotal = useMemo(() => getTotalSum(rows), [rows]);

  return (
    <ThemeProvider theme={theme}>
      {!!productsQuantity && !!productsQuantity.length &&
        <Grid container direction='column' justify='center'>
          <Grid item>
            <TableContainer component={Box}>
              { isMobile
                ? <TableMobileView
                  classes={classes}
                  handleQuantity={handleQuantity}
                  rows={rows}
                  deleteFromShopCart={deleteFromShopCart}
                  productsAmount={shoppingCart.length}
                />
                : <TableDesktopView
                  classes={classes}
                  handleQuantity={handleQuantity}
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
    shoppingCart: store.userChoice && store.userChoice.shoppingCart,
    productsQuantity: store.stock && store.stock.quantity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeShoppingCart: () => dispatch(changeShoppingCart()),
    getProductsQuantity: idArray => dispatch(getProductsQuantity(idArray))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ShopCartView));