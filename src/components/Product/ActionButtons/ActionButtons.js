import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardActions } from '@material-ui/core';
import ButtonAddToCart from './ButtonAddToCart/ButtonAddToCart';
import FavoriteIcon from './FavoriteIcon/FavoriteIcon';
import ButtonCompare from './ButtonCompare/ButtonCompare';
import { labels } from '../labels';
import { getStorageData, setStorageData } from '../../../helpers/helpers';
import { changeWishList } from '../../../redux/actions/actions';
import AjaxUtils from '../../../ajax';

const ActionButtons = (props) => {
  const { classes, product, width, disabledSpacing, isProductPage, token, changeWishList } = props;
  changeWishList(getStorageData('wishList'));

  // todo logic
  const addToCart = (id) => {
    console.log(`product with id ${id} added to shopping cart`);
  };

  const addToCompare = (id) => {
    console.log(`product with id ${id} added to compare`);
  };

  const toggleWishList = (id) => {
    const wishListLocal = getStorageData('wishList');
    if (wishListLocal.find(item => item === id)) {
      setStorageData('wishList', wishListLocal.filter(item => item !== id));
      if (token) {
        AjaxUtils.WishLists.deleteProductFromWishlist(id)
          .then(result => {
            console.log(result);
          });
      }
    } else {
      setStorageData('wishList', [...wishListLocal, id]);
      if (token) {
        AjaxUtils.WishLists.addProductToWishList(id)
          .then(result => {
            console.log(result);
          });
      }
    }
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
        addToWishList={toggleWishList}
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

const mapStateToProps = store => {
  return {
    token: store.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: data => dispatch(changeWishList(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ActionButtons));