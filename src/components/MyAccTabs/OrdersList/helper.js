import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { capitalize } from '../../../helpers/helpers';
export const getAddress = (deliveryAddress, classes) => {
  if (typeof deliveryAddress === 'string') {
    return deliveryAddress;
  } else {
    return <>
      <span className={classes.text} style={{display: 'block'}}>
        <span className={classes.title}>City: </span>
        {deliveryAddress.city}, </span>
      <span className={classes.text} style={{display: 'block'}}>
        <span className={classes.title}>Nova Poshta Office: </span>
        {deliveryAddress.office} </span>
    </>;
  }
};

export const getPaymentStatus = (isPaid) => {
  if (isPaid) {
    return 'Paid';
  } else return 'Not paid';
};

export const getProductsCell = (products, length, classes) => {
  return products.map((product, index) => (
    <Box key={product.productId._id + product.sizeId._id} className={classes.product}>
      <Link to={`/products/${product.productId._id}`}
        className={classes.name}>{capitalize(product.productId.name)}</Link>
      <Typography className={classes.text}>
        <span className={classes.title}>Color: </span>
        {capitalize(product.colorId.name)}</Typography>
      <Typography className={classes.text}>
        <span className={classes.title}>Size: </span>
        {capitalize(product.sizeId.name)}</Typography>
      <Typography className={classes.text}>
        <span className={classes.title}>Unit price: </span>
              ${product.productId.price}</Typography>
      <Typography className={classes.text}>
        <span className={classes.title}>Quantity: </span>
        {product.quantity}</Typography>
      {index !== length - 1 ? <Divider/> : null}
    </Box>
  ));
};
