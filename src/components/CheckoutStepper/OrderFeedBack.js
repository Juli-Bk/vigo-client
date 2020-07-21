import { Box, Typography } from '@material-ui/core';
import { LiqPayPay } from 'react-liqpay';
import keysConfig from '../../keysConfig';
import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {setCheckoutPossible} from '../../redux/actions/actions';

const OrderFeedBack = (props) => {
  const {classes, orderDetails, orderData, isFullData, shoppingCart, setCheckoutPossible, resetSteps} = props;

  useEffect(() => {
    return () => {
      if (orderDetails.orderNumber && !shoppingCart.length) {
        setCheckoutPossible(false);
        resetSteps();
      }
    };
  }, [orderDetails.orderNumber, resetSteps, setCheckoutPossible, shoppingCart.length]);

  return (
    <Box>
      {orderDetails && orderDetails.orderNumber ? <Typography variant='h6' className={classes.instructions}>Thank you for your order.</Typography>
        : <Typography variant='h6' className={classes.instructions}>Order In Process.</Typography> }
      {orderDetails && orderDetails.orderNumber
        ? <Typography variant='body2' className={classes.instructions}>Your order number is {orderDetails.orderNumber}.
                            We have emailed your order confirmation, and will send you an update when your order has shipped.
                            Thank you for your order.</Typography>
        : <Typography variant='body2' className={classes.instructions}>Your order has not been placed. Please, verify your order data and/or internet connection.</Typography> }
      {orderDetails && orderDetails.paymentMethod === 'LiqPay' && orderDetails.orderNumber &&
                <LiqPayPay
                  title='Pay: '
                  style={{margin: 8}}
                  publicKey={keysConfig.liqpay_public_key}
                  privateKey={keysConfig.liqpay_private_key}
                  currency={keysConfig.liqpay_currency}

                  result_url={`${keysConfig.clientAddress}/`}
                  server_url={`${keysConfig.serverAddress}/orders/liqpay/order-payment`}

                  amount={`${orderData.totalSum}`}
                  description={'Payment for Vigo Shop order.'}
                  orderId={orderData.orderId}
                  disabled={!isFullData}
                />}
    </Box>
  );
};

const mapStateToProps = store => {
  return {
    orderDetails: store.checkout && store.checkout.orderDetails,
    shoppingCart: store.userChoice && store.userChoice.shoppingCart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCheckoutPossible: flag => dispatch(setCheckoutPossible(flag))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(OrderFeedBack));