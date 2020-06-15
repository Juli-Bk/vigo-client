import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, useMediaQuery } from '@material-ui/core';
import AjaxUtils from '../../ajax';
import globalConfig from '../../globalConfig';

import ProductsTable from '../../containers/ProductsTable/ProductsTable';
import EmptyState from '../../components/EmptyState/EmptyState';

const ShoppingCart = (props) => {
  const {shoppingCart} = props;
  const [products, setProducts] = useState([]);
  const isMobile = useMediaQuery('(max-width: 550px)');
  const filterArray = (shoppingCart.length && [{_id: shoppingCart}]) || [];

  useEffect(() => {
    // eslint-disable-next-line
    let isCanceled = false;

    if (filterArray.length) {
      AjaxUtils.Products.getProductsByFilters(filterArray, 1, 15, '')
        .then(result => {
          setProducts(result.products);
        });
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
          ? <ProductsTable
            products={products}
            isShoppingCart={true}
            isMobile={isMobile}/>
          : <EmptyState text={globalConfig.emptyCart}/>}
      </Grid>
    </Container>
  );
};

const mapStateToProps = store => {
  return {
    shoppingCart: store.shoppingCart
  };
};

ShoppingCart.propTypes = {
  shoppingCart: PropTypes.array
};

export default connect(mapStateToProps)(React.memo(ShoppingCart));