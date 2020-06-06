import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import PageTitle from '../../components/PageTitle/PageTitle';
import AjaxUtils from '../../ajax';
import ProductListView from '../../components/Product/ProductListView/ProductListView';
import { getJWTfromCookie } from '../../ajax/common/helper';
import globalConfig from '../../globalConfig';

const Wishlist = (props) => {
  const {token, wishList} = props;
  const [products, setProducts] = useState([]);

  const filterArray = wishList.length ? [{_id: wishList}] : [];

  const data = products.map(product => {
    return (
      <Grid item key={product._id}>
        <ProductListView productData={product}/>
      </Grid>
    );
  });

  useEffect(() => {
    let isCanceled = false;

    if (token || getJWTfromCookie()) {
      AjaxUtils.Users.getUser()
        .then(result => {
          AjaxUtils.WishLists.getUserWishList(result._id)
            .then(result => {
              console.log(result);
            });
        });
    }

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
  }, [token, wishList]);

  return (
    <Container>
      <PageTitle title='Wishlist' />
      <Grid container>
        {data.length ? data : <Typography variant='h6'>{globalConfig.emptyWishList}</Typography>}
      </Grid>
    </Container>
  );
};

const mapStateToProps = store => {
  return {
    token: store.token,
    wishList: store.wishList
  };
};

export default connect(mapStateToProps)(React.memo(Wishlist));