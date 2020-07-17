import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, useMediaQuery } from '@material-ui/core';
import globalConfig from '../../globalConfig';
import { getProductsId } from './cartHelpers';
import ShopCartView from '../../components/ShopCartView/ShopCartView';
import EmptyState from '../../components/EmptyState/EmptyState';
import {getProductsByFilters} from '../../redux/actions/products';
import { changeShoppingCart } from '../../redux/actions/shopCart';

const ShoppingCart = (props) => {
  const {shoppingCart, products, getProductsByFilters} = props;
  const isMobile = useMediaQuery('(max-width: 724px)');
  const flag = useMemo(() => !!(shoppingCart.length && products.data && products.data.length), [products.data, shoppingCart.length]);

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      const productsId = getProductsId(shoppingCart);
      const filterArray = (productsId.length && [{_id: productsId}]) || [];
      getProductsByFilters(filterArray, 1, 15, '');
    }
    return () => {
      isCanceled = true;
    };
  }, [shoppingCart, getProductsByFilters]);

  return (
    <Container style={{textAlign: 'center'}}>
      { flag
        ? <ShopCartView
          products={products.data}
          isMobile={isMobile}/>
        : <EmptyState text={globalConfig.cartMessages.EMPTY} linkText='Let`s fix it'/>}
    </Container>
  );
};

ShoppingCart.propTypes = {
  shoppingCart: PropTypes.array,
  products: PropTypes.object,
  getProductsByFilters: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    shoppingCart: store.userChoice.shoppingCart,
    products: store.stock.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsByFilters: (filters, startPage, perPage, sort) => {
      dispatch(getProductsByFilters(filters, startPage, perPage, sort));
    },
    changeShoppingCart: () => dispatch(changeShoppingCart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ShoppingCart));