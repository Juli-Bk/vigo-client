import React, {useCallback, useState} from 'react';
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

import {setLoginModalOpenState, setPersDetailsOpenState} from '../../redux/actions/actions';
import {setUser} from '../../redux/actions/user';
import {placeOrder} from '../../redux/actions/orders';
import {setOrder} from './helper';

const steps = ['Personal data', 'Delivery', 'Payment', 'Order'];

const CheckoutStepper = (props) => {
  const {
    setLoginModalOpenState, setPersDetailsOpenState, user,
    placeOrder, shoppingCart, guestData, totalSum, orderDetails
  } = props;
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [guest, setGuest] = useState({radioGroup: null});
  const [completed, setCompleted] = useState(new Set());

  const onSubmitCallback = useCallback((values, callback) => {
    callback();
    if (values.radioGroup === 'iWillRegister') {
      setLoginModalOpenState(true);
    }
    if (values.radioGroup === 'asGuest') {
      setPersDetailsOpenState(true);
    }
    setGuest({radioGroup: values.radioGroup});
  }, [setLoginModalOpenState, setPersDetailsOpenState]);

  const getStepContent = useCallback((stepIndex) => {
    let fields = null;
    const asAGuest = guest.radioGroup && guest.radioGroup === 'asGuest';
    switch (stepIndex) {
      case 0:
        if (Object.keys(user).length > 0 || asAGuest) {
          fields = <ModalPersDetails setCompleted={setCompleted} activeStep={activeStep}/>;
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
      default:
        return 'Unknown stepIndex';
    }
  }, [guest.radioGroup, onSubmitCallback, user]);

  const orderHandler = useCallback(() => {
    setOrder(user, guestData, totalSum, orderDetails, shoppingCart, placeOrder);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [guestData, orderDetails, placeOrder, shoppingCart, totalSum, user]);

  const handleNext = useCallback(() => {
    activeStep === steps.length - 1
      ? orderHandler()
      : setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [activeStep, orderHandler]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

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
          {activeStep === steps.length ? (
            <Box>
              <Typography variant='h6' className={classes.instructions}>Thank you for your order.</Typography>
              {orderDetails && orderDetails.orderNumber &&
              <Typography variant='body2' className={classes.instructions}>Your order number is {orderDetails.orderNumber}.
                We have emailed your order confirmation, and will send you an update when your order has shipped.
                Thank you for your order.</Typography>}
            </Box>
          ) : (
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
                    disabled={completed.has(activeStep)}
                    className={commonClasses.button}
                    onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Confirm' : '>'}
                  </Button>
                </Box>
              </Box>
            </Container>
          )}
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
    orderDetails: store.orderDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => dispatch(setUser(data)),
    setLoginModalOpenState: isOpen => dispatch(setLoginModalOpenState(isOpen)),
    setPersDetailsOpenState: isOpen => dispatch(setPersDetailsOpenState(isOpen)),
    placeOrder: (userId, products, orderData) => dispatch(placeOrder(userId, products, orderData))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CheckoutStepper));