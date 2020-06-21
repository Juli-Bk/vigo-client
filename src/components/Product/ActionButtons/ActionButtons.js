import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardActions } from '@material-ui/core';
import ButtonAddToCart from './ButtonAddToCart/AddToCartButton';
import FavoriteIcon from './FavoriteIcon/FavoriteIcon';
import ButtonCompare from './ButtonCompare/ButtonCompare';
import globalConfig from '../../../globalConfig';
import {toggleWishItems, cartHandler } from '../../../helpers/helpers';
import { changeShoppingCart} from '../../../redux/actions/shopCart';
import { changeWishList } from '../../../redux/actions/wishlist';

const ActionButtons = (props) => {
  const { classes, product, width, disabledSpacing, isProductPage, changeWishList, changeShoppingCart } = props;
  const toggleInCart = (productId) => {
    cartHandler(productId);
    changeShoppingCart();
  };

  const addToCompare = (productId) => {
    // todo implementation
    console.log(`product with id ${productId} added to compare`);
  };

  const toggleWishList = (productId) => {
    toggleWishItems(productId);
    changeWishList();
  };

  const defineLabel = (width, isProductPage, label) => {
    return isProductPage ? label
      : ((width === 'lg' || width === 'xl') ? label : null);
  };

  return (
    <CardActions disableSpacing={disabledSpacing}>
      <ButtonAddToCart classes={classes.button} id={product._id} addToCart={toggleInCart}/>
      <FavoriteIcon classes={classes}
        id={product._id}
        addToWishList={toggleWishList}
        label={defineLabel(width, isProductPage, globalConfig.iconsLabels.ADD_TO_WISHLIST)}/>
      <ButtonCompare classes={classes}
        id={product._id}
        addToCompare={addToCompare}
        label={defineLabel(width, isProductPage, globalConfig.iconsLabels.ADD_TO_COMPARE)}/>
    </CardActions>
  );
};

ActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  labels: PropTypes.object,
  width: PropTypes.string,
  disabledSpacing: PropTypes.bool,
  isProductPage: PropTypes.bool,
  token: PropTypes.string,
  changeWishList: PropTypes.func.isRequired,
  changeShoppingCart: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    token: store.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: () => dispatch(changeWishList()),
    changeShoppingCart: () => dispatch(changeShoppingCart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ActionButtons));