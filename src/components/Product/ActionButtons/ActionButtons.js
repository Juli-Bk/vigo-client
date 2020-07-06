import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardActions } from '@material-ui/core';
import ButtonAddToCart from './ButtonAddToCart/AddToCartButton';
import FavoriteIcon from './FavoriteIcon/FavoriteIcon';
import ButtonCompare from './ButtonCompare/ButtonCompare';
import globalConfig from '../../../globalConfig';
import { addToCart } from '../../../pages/ShoppingCart/cartHelpers';
import {
  setCurrentProduct, setPopoverOpenState, setSnackMessage,
  toggleModalSize
} from '../../../redux/actions/actions';
import {changeShoppingCart} from '../../../redux/actions/shopCart';
import {changeWishList, toggleWishItems} from '../../../redux/actions/wishlist';
import { updateCompareList, setStorageData } from '../../../helpers/helpers';

const ActionButtons = (props) => {
  const {
    classes, product, width, disabledSpacing,
    isProductPage, changeWishList, changeShoppingCart,
    setPopoverOpen, sizeId, colorId, quantity,
    toggleModalSize, isModal, setCurrentProduct,
    isModalSize, setSnackMessage, toggleWishItems
  } = props;

  const addToShopCart = (productId, quantity, sizeId, colorId) => {
    setCurrentProduct(product);
    if (!sizeId) {
      isModalSize && setSnackMessage(true, 'Please, choose size', globalConfig.snackSeverity.ERROR);
      isProductPage && !isModalSize ? setPopoverOpen(true) : toggleModalSize(true);
    } else {
      addToCart(productId, quantity, sizeId, colorId);
      changeShoppingCart();
      toggleModalSize(false);
    }
  };

  const addToCompare = (productId) => {
    const updatedList = updateCompareList(productId);
    setStorageData('compareList', updatedList);
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
      <ButtonAddToCart classes={classes.button}
        id={product._id}
        addToCart={addToShopCart}
        quantity={quantity}
        product={product}
        sizeId={sizeId}
        colorId={colorId}/>
      {!isModal
        ? <>
          <FavoriteIcon classes={classes}
            id={product._id}
            addToWishList={toggleWishList}
            label={defineLabel(width, isProductPage, globalConfig.iconsLabels.ADD_TO_WISHLIST)}/>
          <ButtonCompare classes={classes}
            id={product._id}
            addToCompare={addToCompare}
            label={defineLabel(width, isProductPage, globalConfig.iconsLabels.ADD_TO_COMPARE)}/>
        </>
        : null}
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
  changeShoppingCart: PropTypes.func.isRequired,
  toggleModalSize: PropTypes.func.isRequired,
  sizeId: PropTypes.string,
  colorId: PropTypes.string
};

const mapStateToProps = store => {
  return {
    token: store.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: () => dispatch(changeWishList()),
    changeShoppingCart: () => dispatch(changeShoppingCart()),
    toggleModalSize: flag => dispatch(toggleModalSize(flag)),
    setCurrentProduct: product => dispatch(setCurrentProduct(product)),
    setPopoverOpen: flag => dispatch(setPopoverOpenState(flag)),
    setSnackMessage: (isOpen, message, severity) => dispatch(setSnackMessage(isOpen, message, severity)),
    toggleWishItems: id => dispatch(toggleWishItems(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ActionButtons));