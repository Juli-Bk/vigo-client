import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, useMediaQuery } from '@material-ui/core';

import WishListView from '../../components/WishListView/WishListView';
import EmptyState from '../../components/EmptyState/EmptyState';
import globalConfig from '../../globalConfig';
import { changeWishList } from '../../redux/actions/wishlist';
import { getProductsByFilters } from '../../redux/actions/products';

const Wishlist = (props) => {
  const {wishList, getProductsByFilters, products, isMyAccount} = props;
  const isMobile = useMediaQuery('(max-width: 724px)');

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      const filterArray = (wishList.length && [{_id: wishList}]) || [];
      getProductsByFilters(filterArray, 1, globalConfig.wishlistLength, '');
    }
    return () => {
      isCanceled = true;
    };
  }, [wishList, getProductsByFilters]);

  return (
    <Container disableGutters={isMyAccount}>
      <Grid container>
        {wishList.length && products.data && products.data.length
          ? <WishListView products={products.data} isMobile={isMobile}/>
          : <EmptyState text={globalConfig.wishListMessages.EMPTY} linkText='Let`s fix it'/>}
      </Grid>
    </Container>
  );
};

Wishlist.propTypes = {
  wishlist: PropTypes.array,
  isMyAccount: PropTypes.bool,
  products: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  return {
    wishList: store.userChoice.wishList,
    products: store.stock.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: () => dispatch(changeWishList()),
    getProductsByFilters: (filters, startPage, perPage, sort) => {
      dispatch(getProductsByFilters(filters, startPage, perPage, sort));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Wishlist));