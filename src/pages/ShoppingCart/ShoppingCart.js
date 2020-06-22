import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, useMediaQuery } from '@material-ui/core';
import globalConfig from '../../globalConfig';
import { getProductsId } from './cartHelpers';
import { getProductsByFilters } from '../../redux/actions/Products';
import ShopCartView from '../../components/ShopCartView/ShopCartView';
import EmptyState from '../../components/EmptyState/EmptyState';

const ShoppingCart = (props) => {
  const {shoppingCart, getProductsByFilters, products} = props;

  const isMobile = useMediaQuery('(max-width: 550px)');
  const productsId = getProductsId(shoppingCart);
  const filterArray = (productsId.length && [{_id: productsId}]) || [];

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      getProductsByFilters(filterArray, 1, 15, '');
    }
    return () => {
      isCanceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingCart]);

  return (
    <Container>
      <Grid container>
        {shoppingCart.length && products.length
          ? <ShopCartView
            products={products}
            isMobile={isMobile}/>
          : <EmptyState text={globalConfig.emptyCart}/>}
      </Grid>
    </Container>
  );
};

const mapStateToProps = store => {
  return {
    shoppingCart: store.shoppingCart,
    products: store.productsByFilters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsByFilters: (args) => dispatch(getProductsByFilters(args))
  };
};

ShoppingCart.propTypes = {
  shoppingCart: PropTypes.array,
  products: PropTypes.array,
  getProductsByFilters: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ShoppingCart));