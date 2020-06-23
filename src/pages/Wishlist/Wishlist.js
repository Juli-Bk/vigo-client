import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Grid, useMediaQuery } from '@material-ui/core';

import WishListView from '../../components/WishListView/WishListView';
import EmptyState from '../../components/EmptyState/EmptyState';
import globalConfig from '../../globalConfig';
import { changeWishList } from '../../redux/actions/wishlist';
import { getProductsByFilters } from '../../redux/actions/Products';

const Wishlist = (props) => {
  const {wishList, getProductsByFilters, products} = props;
  const isMobile = useMediaQuery('(max-width: 550px)');
  const filterArray = (wishList.length && [{_id: wishList}]) || [];

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      getProductsByFilters(filterArray, 1, 8, '');
    }
    return () => {
      isCanceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishList, getProductsByFilters]);

  return (
    <Container>
      <Grid container>
        {wishList.length && products.data
          ? <WishListView products={products.data} isMobile={isMobile}/>
          : <EmptyState text={globalConfig.emptyWishList}/>}
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
    wishList: store.wishList,
    products: store.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: () => dispatch(changeWishList()),
    getProductsByFilters: filters => dispatch(getProductsByFilters(filters))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Wishlist));