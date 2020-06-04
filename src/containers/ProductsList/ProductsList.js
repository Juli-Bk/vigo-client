import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import ProductListView from '../../components/Product/ProductListView/ProductListView';

const ProductsList = (props) => {
  const { products } = props;

  const cards = products.map(product => (
    <Grid item lg={12} md={12} sm={12} xs={12} key={product._id}>
      <ProductListView
        key={product._id}
        productData={product}/>
    </Grid>)
  );

  return <Grid container justify="center" spacing={2}>{cards}</Grid>;
};

ProductsList.propTypes = {
  products: PropTypes.array.isRequired
};

export default React.memo(ProductsList);