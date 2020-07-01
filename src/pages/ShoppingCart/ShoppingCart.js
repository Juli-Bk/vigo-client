import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, useMediaQuery } from '@material-ui/core';
import globalConfig from '../../globalConfig';
import { getProductsId } from './cartHelpers';
import ShopCartView from '../../components/ShopCartView/ShopCartView';
import EmptyState from '../../components/EmptyState/EmptyState';
import { getProductsInCart } from '../../redux/actions/shopCart';
import {getProductsByFilters} from '../../redux/actions/products';

const ShoppingCart = (props) => {
  const {shoppingCart, products, getProductsInCart, getProductsByFilters} = props;
  const isMobile = useMediaQuery('(max-width: 550px)');

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      const productsId = getProductsId(shoppingCart);
      const filterArray = (productsId.length && [{_id: productsId}]) || [];
      getProductsByFilters(filterArray, 1, 15, '');
      // if (productsId.length) getProductsInCart(productsId);
    }
    return () => {
      isCanceled = true;
    };
  }, [shoppingCart, getProductsInCart, getProductsByFilters]);

  return (
    <Container>
      { products && products.data && products.data.length
        ? <ShopCartView
          products={products.data}
          isMobile={isMobile}/>
        : <EmptyState text={globalConfig.emptyCart}/>}
    </Container>
  );
};

ShoppingCart.propTypes = {
  shoppingCart: PropTypes.array,
  getProductsInCart: PropTypes.func.isRequired
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
    getProductsInCart: idArray => dispatch(getProductsInCart(idArray)),
    getProductsByFilters: (filters, startPage, perPage, sort) => {
      dispatch(getProductsByFilters(filters, startPage, perPage, sort));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ShoppingCart));