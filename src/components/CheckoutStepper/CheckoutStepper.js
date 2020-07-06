import React, { useCallback, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {ThemeProvider} from '@material-ui/core/styles';
import {Container, Box, Typography, Stepper, Step, StepLabel, Button} from '@material-ui/core';

import PaymentForm from '../PaymentForm/PaymentForm';
import DeliveryForm from '../DeliveryForm/DeliveryForm';
import OrderSummary from './OrderSummary/OrderSummary';
import ModalPersDetails from '../ModalPersDetails/ModalPersDetails';
import NewCustomerForm from '../../components/NewCustomerForm/NewCustomerForm';

import useCommonStyles from '../../styles/formStyle/formStyle';
import useStyles from './CheckoutStepperStyles';
import theme from './CheckoutStepperTheme';

import {
  setLoginModalOpenState,
  setPersDetailsOpenState,
  setActiveStep
} from '../../redux/actions/actions';
import {setUser} from '../../redux/actions/user';
import {placeOrder} from '../../redux/actions/orders';
import {setOrder} from './helper';
import {setStorageData} from '../../helpers/helpers';

const steps = ['Personal data', 'Delivery', 'Payment', 'Order'];

const CheckoutStepper = (props) => {
  const {
    setLoginModalOpenState, setPersDetailsOpenState, user,
    placeOrder, shoppingCart, guestData, totalSum, orderDetails, completed,
    setActiveStep, activeStep
  } = props;
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [guest, setGuest] = useState({radioGroup: null});

  const resetSteps = useCallback(() => {
    localStorage.setItem('activeStep', JSON.stringify(0));
    setActiveStep(0);
  }, [setActiveStep]);

  useEffect(() => {
    if (!completed.length) resetSteps();
    return () => {
      if (orderDetails.orderNumber) resetSteps();
    };
  }, [completed.length, orderDetails.orderNumber, resetSteps]);

  const onSubmitCallback = useCallback((values, callback) => {
    if (!shoppingCart.length) setStorageData('totalSum', 0);
    callback();
    if (values.radioGroup === 'iWillRegister') {
      setLoginModalOpenState(true);
    }
    if (values.radioGroup === 'asGuest') {
      setPersDetailsOpenState(true);
    }
    setGuest({radioGroup: values.radioGroup});
  }, [setLoginModalOpenState, setPersDetailsOpenState, shoppingCart.length]);

  const getStepContent = useCallback((stepIndex) => {
    let fields = null;
    const asAGuest = guest.radioGroup && guest.radioGroup === 'asGuest';
    switch (stepIndex) {
      case 0:
        if (Object.keys(user).length > 0 || asAGuest) {
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
          </Box>
        );
      default:
        return 'Unknown stepIndex';
    }
  }, [classes.instructions, guest.radioGroup, onSubmitCallback, orderDetails, user]);

  const orderHandler = useCallback(() => {
    setOrder(user, guestData, totalSum, orderDetails, shoppingCart, placeOrder);
    setActiveStep(activeStep + 1);
  }, [activeStep, guestData, orderDetails, placeOrder, setActiveStep, shoppingCart, totalSum, user]);

  const handleNext = useCallback(() => {
    resetSteps();
    activeStep === steps.length - 1
      ? orderHandler()
      : setActiveStep(activeStep + 1);
  }, [activeStep, orderHandler, resetSteps, setActiveStep]);

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
                {
                  getStepContent(activeStep)
                }
              </Typography>
              <Box className={classes.buttonContainer}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={commonClasses.button}
                >
                  {'<'}
                </Button>
                <Button
                  disabled={!completed.includes(activeStep)}
                  className={commonClasses.button}
                  onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Confirm' : '>'}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const mapStateToProps = store => {
  return {
    user: store.user,
    shoppingCart: store.shoppingCart,
    guestData: store.guestData,
    orderDetails: store.orderDetails,
    completed: store.checkoutSteps.completed,
    activeStep: store.checkoutSteps.active
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => dispatch(setUser(data)),
    setLoginModalOpenState: isOpen => dispatch(setLoginModalOpenState(isOpen)),
    setPersDetailsOpenState: isOpen => dispatch(setPersDetailsOpenState(isOpen)),
    placeOrder: (userId, products, orderData) => dispatch(placeOrder(userId, products, orderData)),
    setActiveStep: step => dispatch(setActiveStep(step))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CheckoutStepper));