import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Box, ThemeProvider, TableContainer} from '@material-ui/core';
import useStyles from '../CompareProductTable/CompareListViewStyles';
import {theme} from './CompareViewTheme';
import CompareListDesktopView from './CompareListDesktopView';

const CompareProductTable = (props) => {
  const {products} = props;
  const classes = useStyles();

  const rows = products.data && products.data.map(product => {
    return {
      product: product,
      imgUrl: product.imageUrls[0],
      name: product.name,
      productCode: product.productId,
      price: product.price,
      id: product._id,
      salePrice: product.salePrice,
      brand: product.brandId?.name || 'not specified',
      isOnSale: product.isOnSale,
      description: product.description
    };
  });
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Box}>
        <CompareListDesktopView
          classes={classes}
          productsLenght={products.length}
          rows={rows}
        />
      </TableContainer>
    </ThemeProvider>
  );
};

CompareProductTable.propTypes = {
  products: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  return {
    products: store.stock && store.stock.products
  };
};

export default React.memo(connect(mapStateToProps)(CompareProductTable));