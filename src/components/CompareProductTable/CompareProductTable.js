import React, { useCallback } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import EmptyState from '../EmptyState/EmptyState';
import {Box, ThemeProvider, TableContainer} from '@material-ui/core';
import {changeCompareList} from '../../redux/actions/comparelist';
import {theme} from '../WishListView/WishListViewTheme';
import useStyles from '../WishListView/WishListViewStyles';
import CompareListMobileView from './CompareListMobileView';
import CompareListDesktopView from './CompareListDesktopView';
import globalConfig from '../../globalConfig';

const CompareProductTable = (props) => {
  const {isMobile, products, compareList, changeCompareList} = props;
  const classes = useStyles();

  const deleteFromCompareList = (id) => {
    changeCompareList();
  };

  const rows = useCallback(() => {
    products.data && products.data.map(product => {
      return {
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
  }, [products.data]);

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Box}>
        {products.data && products.data.length
          ? isMobile
            ? <CompareListMobileView
              classes={classes}
              productsLenght={products.length}
              rows={rows}
              deleteFromComparehList={deleteFromCompareList}
            />
            : <CompareListDesktopView
              classes={classes}
              rows={rows}
              deleteFromCompareList={deleteFromCompareList}
            />
          : <EmptyState text={globalConfig.compareMessages.EMPTY}/>}
      </TableContainer>
    </ThemeProvider>
  );
};

CompareProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  comparelist: PropTypes.array,
  changeCompareList: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  return {
    compareList: store.compareList,
    products: store.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCompareList: () => dispatch(changeCompareList())
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CompareProductTable));