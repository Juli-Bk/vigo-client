import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, useMediaQuery } from '@material-ui/core';
import PageTitle from '../../components/PageTitle/PageTitle';
import AjaxUtils from '../../ajax';
import globalConfig from '../../globalConfig';
import ProductsTable from '../../containers/ProductsTable/ProductsTable';

import { changeWishList } from '../../redux/actions/actions';
import EmptyState from '../../components/EmptyState/EmptyState';

const Wishlist = (props) => {
  const {wishList, isMyAccount} = props;
  const [products, setProducts] = useState([]);
  const isMobile = useMediaQuery('(max-width: 550px)');
  const filterArray = wishList.length ? [{_id: wishList}] : [];

  useEffect(() => {
    // eslint-disable-next-line
    let isCanceled = false;

    if (filterArray.length) {
      AjaxUtils.Products.getProductsByFilters(filterArray, 1, 8, '')
        .then(result => {
          setProducts(result.products);
        });
    }
    return () => {
      isCanceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishList]);

  return (
    <Container>
      {isMyAccount ? null : <PageTitle title='Wishlist' />}
      <Grid container>
        {wishList.length && products.length ? <ProductsTable products={products} isMobile={isMobile}/>
          : <EmptyState text={globalConfig.emptyWishList}/>}
      </Grid>
    </Container>
  );
};

const mapStateToProps = store => {
  return {
    token: store.token,
    wishList: store.wishList,
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: data => dispatch(changeWishList(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Wishlist));