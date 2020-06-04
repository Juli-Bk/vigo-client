import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import ProductGridView from '../../components/Product/ProductGridView/ProductGridView';

const ProductGrid = (props) => {
  const { products } = props;

  const cards = products.map(product => (
    <Grid item lg={4} md={4} sm={6} xs={12} key={product._id}>
      <ProductGridView
        key={product._id}
        productData={product}/>
    </Grid>)
  );

  return <Grid container justify="center" spacing={2}>{cards}</Grid>;
};

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired
};

export default React.memo(ProductGrid);