import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, useMediaQuery } from '@material-ui/core';
import globalConfig from '../../globalConfig';
import { getProductsId } from './cartHelpers';
import ShopCartView from '../../components/ShopCartView/ShopCartView';
import EmptyState from '../../components/EmptyState/EmptyState';
import { getProductsInCart } from '../../redux/actions/shopCart';

const ShoppingCart = (props) => {
  const {shoppingCart, cartProducts, getProductsInCart} = props;
  const isMobile = useMediaQuery('(max-width: 550px)');

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      const productsId = getProductsId(shoppingCart);
      if (productsId.length) getProductsInCart(productsId);
    }
    return () => {
      isCanceled = true;
    };
  }, [shoppingCart, getProductsInCart]);

  return (
    <Container>
      { cartProducts && cartProducts.length
        ? <ShopCartView
          products={cartProducts}
          isMobile={isMobile}/>
        : <EmptyState text={globalConfig.emptyCart}/>}
    </Container>
  );
};

const mapStateToProps = store => {
  return {
    shoppingCart: store.shoppingCart,
    products: store.products,
    cartProducts: store.cartProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsInCart: idArray => dispatch(getProductsInCart(idArray))
  };
};

ShoppingCart.propTypes = {
  shoppingCart: PropTypes.array,
  getProductsInCart: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ShoppingCart));