import React, { useEffect} from 'react';
import {Container, makeStyles, Typography, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getProductsByFilters } from '../../../redux/actions/products';
import { getProductsId } from '../../../pages/ShoppingCart/cartHelpers';
import { getProductsQuantity } from '../../../redux/actions/quantity';
import { getProductData, renderGuestAddress, renderUserAddress} from './helper';
import ClientPersData from './ClientPersData';
import ProductsList from './ProductsTable';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const useStyles = makeStyles(() => ({
  data: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center'
  },
  title: {
    color: colors.phPrimary,
    fontFamily: fonts.f3,
    fontSize: '1.2rem',
    fontWeight: 600
  },
  text: {
    color: colors.fontThird,
    fontSize: '1rem'
  }
}));

const OrderSummary = (props) => {
  const classes = useStyles();
  const {
    user, totalSum, shoppingCart, getProductsByFilters,
    guestData, products, productsQuantity, getProductsQuantity
  } = props;

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      const productsId = getProductsId(shoppingCart);
      getProductsByFilters([{_id: productsId}], 1, 15, '');
      getProductsQuantity(productsId);
    }
    return () => {
      isCanceled = true;
    };
  }, [getProductsByFilters, getProductsQuantity, shoppingCart]);

  const productsData = getProductData(products, shoppingCart, productsQuantity);

  return (
    <Container>
      <Grid container>
        <Grid item container xs={12}>
          {productsData && <ProductsList productsData={productsData}/>}
        </Grid>
        <Grid item xs={12} sm={6} className={classes.data}>
          <Typography className={classes.title}>Personal Data: </Typography>
          {user ? <ClientPersData classes={classes} client={user}/>
            : <ClientPersData classes={classes} client={guestData}/>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.title}>Delivery Address: </Typography>
          {user ? renderUserAddress(user, classes) : renderGuestAddress(guestData, classes)}
        </Grid>
        <Grid item xs={6}><Typography>Total sum: ${totalSum}</Typography></Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = store => {
  return {
    user: store.user,
    guestData: store.guestData,
    totalSum: store.totalSum,
    shoppingCart: store.shoppingCart,
    products: store.products,
    productsQuantity: store.quantity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsByFilters: (filters, startPage, perPage, sort) => {
      dispatch(getProductsByFilters(filters, startPage, perPage, sort));
    },
    getProductsQuantity: idArray => dispatch(getProductsQuantity(idArray))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(OrderSummary));