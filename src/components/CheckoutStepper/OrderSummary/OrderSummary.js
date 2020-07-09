import React, { useEffect, useMemo } from 'react';
import { Container, Typography, Grid, useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getProductsByFilters } from '../../../redux/actions/products';
import { getProductsId } from '../../../pages/ShoppingCart/cartHelpers';
import { getProductsQuantity } from '../../../redux/actions/quantity';
import { getProductData, defineDeliveryAddress} from '../helper';
import ClientPersData from './ClientPersData';
import ProductsTableDesktop from './ProductsTableDesktop';
import useStyles from './OrderSummaryStyles';
import ProductsTableMobile from './ProductsTableMobile';
import { setCompletedSteps } from '../../../redux/actions/actions';

const OrderSummary = (props) => {
  const classes = useStyles();
  const {
    user, totalSum, shoppingCart, getProductsByFilters,
    guestData, products, productsQuantity, getProductsQuantity,
    setCompleted, activeStep, orderDetails
  } = props;
  const isMobile = useMediaQuery('(max-width: 550px)');

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      const productsId = getProductsId(shoppingCart);
      getProductsByFilters([{_id: productsId}], 1, 15, '');
      getProductsQuantity(productsId);
      setCompleted(activeStep);
    }
    return () => {
      isCanceled = true;
    };
  }, [activeStep, getProductsByFilters, getProductsQuantity, setCompleted, shoppingCart]);

  const productsData = useMemo(() => getProductData(products, shoppingCart, productsQuantity),
    [products, productsQuantity, shoppingCart]);
  const total = useMemo(() => totalSum || JSON.parse(localStorage.getItem('totalSum')), [totalSum]);

  return (
    <Container>
      <Grid container>
        <Grid item container xs={12}>
          {productsData
            ? isMobile ? <ProductsTableMobile productsData={productsData}/>
              : <ProductsTableDesktop productsData={productsData}/>
            : null
          }
        </Grid>
        <Grid item xs={12} className={classes.total}>
          <Typography className={classes.totalTitle}>Total sum:
            <span className={classes.totalPrice}> ${total}</span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.data}>
          <Typography className={classes.title}>Personal Data: </Typography>
          {user && Object.keys(user).length > 0 ? <ClientPersData classes={classes} client={user}/>
            : Object.keys(guestData).length > 0 ? <ClientPersData classes={classes} client={guestData}/> : null}
        </Grid>
        {defineDeliveryAddress(orderDetails, user, guestData, classes)}
      </Grid>
    </Container>
  );
};

OrderSummary.propTypes = {
  user: PropTypes.object,
  guestData: PropTypes.object,
  totalSum: PropTypes.number.isRequired,
  shoppingCart: PropTypes.array.isRequired,
  products: PropTypes.object.isRequired,
  productsQuantity: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  orderDetails: PropTypes.object.isRequired,
  getProductsByFilters: PropTypes.func.isRequired,
  getProductsQuantity: PropTypes.func.isRequired,
  setCompleted: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    user: store.user,
    guestData: store.guestData,
    totalSum: store.totalSum,
    shoppingCart: store.shoppingCart,
    products: store.products,
    productsQuantity: store.quantity,
    activeStep: store.checkoutSteps.active,
    orderDetails: store.orderDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsByFilters: (filters, startPage, perPage, sort) => {
      dispatch(getProductsByFilters(filters, startPage, perPage, sort));
    },
    getProductsQuantity: idArray => dispatch(getProductsQuantity(idArray)),
    setCompleted: step => dispatch(setCompletedSteps(step))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(OrderSummary));