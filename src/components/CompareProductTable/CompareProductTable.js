import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Box, ThemeProvider, TableContainer} from '@material-ui/core';

import {toggleWishItems} from '../../helpers/helpers';
import {changeCompareList} from '../../redux/actions/comparelist';
import {theme} from '../WishListView/WishListViewTheme';
import useStyles from '../WishListView/WishListViewStyles';
import CompareListMobileView from './CompareListMobileView';
import CompareListDesktopView from './CompareListDesktopView';

const CompareProductTable = (props) => {
  const {isMobile, products, compareList, changeWishList} = props;
  const classes = useStyles();

  const deleteFromCompareList = (id) => {
    toggleWishItems(id);
    changeWishList();
  };

  const rows = products.map(product => {
    return {
      imgUrl: product.imageUrls[0],
      mainData: {name: product.name, color: product.color, size: product.size},
      productCode: product.productId,
      price: product.price,
      id: product._id,
      salePrice: product.salePrice
    };
  });

  return (
    <ThemeProvider theme={theme}>
      {compareList.length && products.length &&
      <TableContainer component={Box}>
        { isMobile
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
          /> }
      </TableContainer>
      }
    </ThemeProvider>
  );
};

CompareProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  comparelist: PropTypes.array,
  changeWishList: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  return {
    compareList: store.compareList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCompareList: () => dispatch(changeCompareList())
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CompareProductTable));