import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ThemeProvider} from '@material-ui/core/styles';
import {Box, Button, Container, Step, StepLabel, Stepper, Typography} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import PaymentForm from '../PaymentForm/PaymentForm';
import DeliveryForm from '../DeliveryForm/DeliveryForm';
import OrderSummary from './OrderSummary/OrderSummary';
import ModalPersDetails from '../ModalPersDetails/ModalPersDetails';
import NewCustomerForm from '../../components/NewCustomerForm/NewCustomerForm';

import useCommonStyles from '../../styles/formStyle/formStyle';
import useStyles from './CheckoutStepperStyles';
import theme from './CheckoutStepperTheme';

import {
  setActiveStep,
  setCompletedSteps,
  setLoginModalOpenState,
  setPersDetailsOpenState
} from '../../redux/actions/actions';
import {setUser} from '../../redux/actions/user';
import {placeOrder} from '../../redux/actions/orders';
import {setOrder, getProductsCodes, checkFullData} from './helper';
import {getStorageData, isEmptyObj, setStorageData} from '../../helpers/helpers';

import {LiqPayPay} from 'react-liqpay';
import keysConfig from '../../keysConfig';

const steps = ['Personal data', 'Delivery', 'Payment', 'Order'];

const CheckoutStepper = (props) => {
  const {
    setLoginModalOpenState, setPersDetailsOpenState, user,
    placeOrder, shoppingCart, guestData, totalSum, orderDetails, completed,
    setActiveStep, activeStep, setCompleted
  } = props;
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [guest, setGuest] = useState({radioGroup: null});

  const guestInfo = useMemo(() => guestData.deliveryAddress
    ? guestData : getStorageData('guestData'), [guestData]);

  const resetSteps = useCallback(() => {
    localStorage.setItem('activeStep', JSON.stringify(0));
    setActiveStep(0);
  }, [setActiveStep]);

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      if (!completed.length) resetSteps();
    }
    return () => {
      if (orderDetails.orderNumber) resetSteps();
      isCanceled = true;
    };
  }, [completed.length, orderDetails.orderNumber, resetSteps]);

  const onSubmitCallback = useCallback((values, callback) => {
    if (!shoppingCart.length) setStorageData('totalSum', 0);
    callback();
    if (values.radioGroup === 'iWillRegister') {
      setLoginModalOpenState(true);
    }
    if (values.radioGroup === 'asGuest' && isEmptyObj(guestInfo)) {
      setPersDetailsOpenState(true);
    }
    if (!isEmptyObj(guestInfo) && !Array.isArray(guestInfo)) {
      setCompleted(activeStep);
    }
    setGuest({radioGroup: values.radioGroup});
  }, [activeStep, guestInfo, setCompleted, setLoginModalOpenState, setPersDetailsOpenState, shoppingCart.length]);

  const getStepContent = useCallback((stepIndex) => {
    let fields = null;
    const asAGuest = guest.radioGroup && guest.radioGroup === 'asGuest';
    const orderData = orderDetails && {
      totalSum: totalSum || JSON.parse(localStorage.getItem('totalSum')),
      productCodes: orderDetails.products && getProductsCodes(orderDetails.products),
      orderId: orderDetails.orderNumber,
      sandbox: 1
    };

    const isFullData = checkFullData(orderData);

    switch (stepIndex) {
      case 0:
        if (!isEmptyObj(user) || (asAGuest)) {
          fields = <ModalPersDetails/>;
        } else {
          fields = <NewCustomerForm submitNewCustomerHandler={onSubmitCallback}/>;
        }
        return (
          fields
        );
      case 1:
        return <DeliveryForm/>;
      case 2:
        return <PaymentForm/>;
      case 3:
        return <OrderSummary/>;
      case 4:
        return (
          <Box>
            <Typography variant='h6' className={classes.instructions}>Thank you for your order.</Typography>
            {orderDetails && orderDetails.orderNumber &&
            <Typography variant='body2' className={classes.instructions}>Your order number is {orderDetails.orderNumber}.
              We have emailed your order confirmation, and will send you an update when your order has shipped.
              Thank you for your order.</Typography>}
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
              description={`Payment for products: ${orderData.productCodes}`}
              orderId={orderData.orderId}
              disabled={!isFullData}
            />}
          </Box>
        );
      default:
        return 'Unknown stepIndex';
    }
  }, [classes.instructions, guest.radioGroup, onSubmitCallback, orderDetails, totalSum, user]);

  const orderHandler = useCallback(() => {
    setOrder(user, guestData, totalSum, orderDetails, shoppingCart, placeOrder);
    setActiveStep(activeStep + 1);
  }, [activeStep, guestData, orderDetails, placeOrder, setActiveStep, shoppingCart, totalSum, user]);

  const handleNext = useCallback(() => {
    activeStep === steps.length - 1
      ? orderHandler()
      : setActiveStep(activeStep + 1);
  }, [activeStep, orderHandler, setActiveStep]);

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep, setActiveStep]);

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>
          <Container>
            <Box>
              <Typography component='span' className={classes.instructions}>
                <Box style={{minHeight: '40vh'}}>
                  {getStepContent(activeStep)}
                </Box>
              </Typography>
              <Box className={classes.buttonContainer}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={activeStep === 0 ? classes.disabled : commonClasses.button}
                >
                  <NavigateBeforeIcon/>
                </Button>
                <Button
                  disabled={!completed.includes(activeStep)}
                  className={!completed.includes(activeStep)
                    ? classes.disabled : commonClasses.button}
                  onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Confirm' : <NavigateNextIcon/>}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

CheckoutStepper.propTypes = {
  user: PropTypes.object.isRequired,
  shoppingCart: PropTypes.array.isRequired,
  guestData: PropTypes.any.isRequired,
  orderDetails: PropTypes.object.isRequired,
  completed: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  setLoginModalOpenState: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setPersDetailsOpenState: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  setCompleted: PropTypes.func.isRequired,
  totalSum: PropTypes.number.isRequired
};

const mapStateToProps = store => {
  return {
    user: store.user,
    shoppingCart: store.shoppingCart,
    guestData: store.guestData,
    orderDetails: store.orderDetails,
    completed: store.checkoutSteps.completed,
    activeStep: store.checkoutSteps.active,
    totalSum: store.totalSum
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => dispatch(setUser(data)),
    setLoginModalOpenState: isOpen => dispatch(setLoginModalOpenState(isOpen)),
    setPersDetailsOpenState: isOpen => dispatch(setPersDetailsOpenState(isOpen)),
    placeOrder: (userId, products, orderData) => dispatch(placeOrder(userId, products, orderData)),
    setActiveStep: step => dispatch(setActiveStep(step)),
    setCompleted: step => dispatch(setCompletedSteps(step))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CheckoutStepper));