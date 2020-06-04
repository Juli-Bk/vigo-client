import React from 'react';
import { CardActions } from '@material-ui/core';
import PropTypes from 'prop-types';
import ButtonAddToCart from './ButtonAddToCart/ButtonAddToCart';
import FavoriteIcon from './FavoriteIcon/FavoriteIcon';
import ButtonCompare from './ButtonCompare/ButtonCompare';
import { labels } from '../labels';

const ActionButtons = (props) => {
  const { classes, product, width, disabledSpacing, isProductPage } = props;

  // todo logic
  const addToCart = (id) => {
    console.log(`product with id ${id} added to shopping cart`);
  };

  const addToCompare = (id) => {
    console.log(`product with id ${id} added to compare`);
  };

  const addToWishList = (id) => {
    console.log(`product with id ${id} added to wish list`);
  };

  const defineLabel = (width, isProductPage, label) => {
    return isProductPage ? label
      : ((width === 'lg' || width === 'xl') ? label : null);
  };

  return (
    <CardActions disableSpacing={disabledSpacing}>
      <ButtonAddToCart classes={classes.button} id={product._id} addToCart={addToCart}/>
      <FavoriteIcon classes={classes}
        id={product._id}
        addToWishList={addToWishList}
        label={defineLabel(width, isProductPage, labels.ADD_TO_WISHLIST)}/>
      <ButtonCompare classes={classes}
        id={product._id}
        addToCompare={addToCompare}
        label={defineLabel(width, isProductPage, labels.ADD_TO_COMPARE)}/>
    </CardActions>
  );
};

ActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  labels: PropTypes.object,
  width: PropTypes.string,
  disabledSpacing: PropTypes.bool,
  isProductPage: PropTypes.bool
};

export default ActionButtons;