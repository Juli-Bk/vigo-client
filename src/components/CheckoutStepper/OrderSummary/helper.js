import React from 'react';
import { Typography } from '@material-ui/core';
import { getChosenProductData, getItemStockData } from '../../../pages/ShoppingCart/cartHelpers';

export const getProductData = (products, shoppingCart, productsQuantity) => {
  const productsData = [];
  if (products && products.data && productsQuantity && productsQuantity.length) {
    products.data.forEach(product => {
      const itemInCart = shoppingCart.find(item => item.productId === product._id);
      const itemStockData = getItemStockData(productsQuantity, product._id);
      const items = getChosenProductData(itemStockData, [itemInCart]);
      if (items[0]) {
        productsData.push({
          imgUrl: product.imageUrls[0],
          id: product._id,
          name: product.name,
          price: product.salePrice,
          quantity: itemInCart.cartQuantity,
          size: items[0].sizeId.name,
          color: items[0].colorId.name
        });
      }
    });
  }
  return productsData;
};

export const renderUserAddress = (user, classes) => {
  return <Typography className={classes.text}>{user.deliveryAddress}</Typography>;
};
export const renderGuestAddress = (guestData, classes) => {
  return <Typography className={classes.text}>{guestData.deliveryAddress.address}, {guestData.deliveryAddress.house}, {guestData.deliveryAddress.apartment}</Typography>;
};