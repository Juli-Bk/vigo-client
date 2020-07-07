import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import EmptyState from '../EmptyState/EmptyState';
import {Box, ThemeProvider, TableContainer} from '@material-ui/core';
import {theme} from '../WishListView/WishListViewTheme';
import useStyles from '../CompareProductTable/CompareListViewStyles';
import CompareListMobileView from './CompareListMobileView';
import CompareListDesktopView from './CompareListDesktopView';
import globalConfig from '../../globalConfig';

const CompareProductTable = (props) => {
  const {isMobile, products} = props;
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
      brand: product.brand,
      isOnSale: product.isOnSale,
      description: product.description
    };
  });
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Box}>
        {products.data && products.data.length
          ? isMobile
            ? <CompareListMobileView
              classes={classes}
              productsLenght={products.length}
              rows={rows}
            />
            : <CompareListDesktopView
              classes={classes}
              rows={rows}
            />
          : <EmptyState text={globalConfig.compareMessages.EMPTY}/>}
      </TableContainer>
    </ThemeProvider>
  );
};

CompareProductTable.propTypes = {
  products: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  return {
    products: store.products
  };
};

export default React.memo(connect(mapStateToProps)(CompareProductTable));