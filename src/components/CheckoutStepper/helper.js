import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { getChosenProductData, getItemStockData } from '../../pages/ShoppingCart/cartHelpers';
import {getStorageData, isEmptyObj} from '../../helpers/helpers';
import globalConfig from '../../globalConfig';

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

export const renderNovaPoshtaData = (client, classes) => {
  return <>
    <Typography className={classes.text}>City: {client.novaPoshta.city}</Typography>
    <Typography className={classes.text}>Office: {client.novaPoshta.office}</Typography>
  </>;
};

export const setOrder = (user, guestData, totalSum, orderDetails, shoppingCart, callback) => {
  const guestInfo = guestData || getStorageData('guestData');
  const total = totalSum || JSON.parse(localStorage.getItem('totalSum'));
  let orderData;
  let userId = null;
  const orderNumber = Date.now() + shoppingCart[0].productId + total;

  const products = shoppingCart.map(item => {
    const quantity = item.cartQuantity;
    delete item.cartQuantity;
    return {
      ...item,
      quantity
    };
  });

  const getDeliveryAddress = (client) => {
    if (orderDetails.shipping === globalConfig.deliveryOptions.NOVA_POSHTA) {
      return client.novaPoshta;
    }
    if (orderDetails.shipping === globalConfig.deliveryOptions.VIGO_COURIER_SERVICE ||
            orderDetails.shipping === globalConfig.deliveryOptions.UKRPOSHTA) {
      return client.deliveryAddress;
    } else return {};
  };

  if (!isEmptyObj(user) && user._id) {
    userId = user._id;
    orderData = {
      userName: `${user.firstName} ${user.lastName}`,
      deliveryAddress: getDeliveryAddress(user),
      email: user.email,
      phoneNumber: user.phoneNumber,
      totalSum: total,
      shipping: orderDetails.shipping,
      paymentInfo: orderDetails.paymentMethod,
      orderNo: orderNumber
    };
  } else {
    orderData = {
      userName: guestInfo.userName,
      orderAsGuest: true,
      deliveryAddress: getDeliveryAddress(guestInfo),
      email: guestInfo.email,
      phoneNumber: guestInfo.phoneNumber,
      totalSum: total,
      shipping: orderDetails.shipping,
      paymentInfo: orderDetails.paymentMethod,
      orderNo: orderNumber
    };
  }
  callback(userId, products, orderData);
};

export const defineDeliveryAddress = (orderDetails, user, guestInfo, classes) => {
  const {deliveryOptions} = globalConfig;

  const deliveryBox = <Grid item xs={12} sm={6}>
    <Typography className={classes.title}>Delivery Address: </Typography>
    {
      !isEmptyObj(user)
        ? renderUserAddress(user, classes)
        : guestInfo && !isEmptyObj(guestInfo.deliveryAddress)
          ? renderGuestAddress(guestInfo, classes)
          : null
    }
  </Grid>;

  const children = !isEmptyObj(user) && user.novaPoshta
    ? renderNovaPoshtaData(user, classes)
    : guestInfo && !isEmptyObj(guestInfo.novaPoshta)
      ? renderNovaPoshtaData(guestInfo, classes)
      : '';

  switch (orderDetails.shipping) {
    case deliveryOptions.PICKUP:
      return null;
    case deliveryOptions.VIGO_COURIER_SERVICE:
      return deliveryBox;
    case deliveryOptions.UKRPOSHTA:
      return deliveryBox;
    case deliveryOptions.NOVA_POSHTA:
      return <Grid item xs={12} sm={6}>
        <Typography className={classes.title}>Nova Poshta: </Typography>
        <Box>{children}</Box>
      </Grid>;
    default: return 'Choose delivery option';
  }
};

export const getProductsCodes = (products) => {
  const codes = [];
  if (products.length) {
    products.forEach(product => {
      codes.push(product.productId);
    });
  }
  return codes;
};