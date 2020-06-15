import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import theme from './CheckoutSteppereTheme';
import DeliveryForm from '../DeliveryForm/DeliveryForm';
import { Container, ListItem } from '@material-ui/core';
import PaymentForm from '../PaymentForm/PaymentForm';
import {connect} from 'react-redux';
import AjaxUtils from '../../ajax/index';
import {getJWTfromCookie} from '../../ajax/common/helper';
import { setUser } from '../../redux/actions/actions';
import ModalPersDetails from '../ModalPersDetails/ModalPersDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    padding: 20
  }
}));

const steps = ['Personal data', 'Delivery Info', 'Payment Info', 'Complete your order'];

// todo get User data from BD and render as static info in 'case 0'
// todo User Order data from BD and render in 'case  3'

const CheckoutStepper = (props) => {
  const {token} = props;
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const getStepContent = (stepIndex, user) => {
    switch (stepIndex) {
      case 0:
        console.log(user);
        return (
          <Box display='flex' flexWrap="wrap">
            <Box p={1}>
              <ListItem>First Name: {user.firstName}</ListItem>
              <ListItem>Last Name: {user.lastName}</ListItem>
              <ListItem>Phone Number: {user.phoneNumber}</ListItem>
              <ListItem>Email: {user.email}</ListItem>
              <ListItem>Address: {user.addresses}</ListItem>
            </Box>
            <Box p={1}>
              <ModalPersDetails />
            </Box>
          </Box>
        );
      case 1:
        return (
          <DeliveryForm/>
        );
      case 2:
        return (
          <PaymentForm/>
        );
      case 3:
        return 'Review of order: order summary';
      default:
        return 'Unknown stepIndex';
    }
  };

  useEffect(() => {
    if (token || getJWTfromCookie()) {
      AjaxUtils.Users.getUser()
        .then(result => {
          if (result.status === 200) {
            setUser(result);
            console.log(result);
          }
        })
        .catch(error => {
          console.log(error);
          return (
            <Button
              href="#text-buttons"
              color='default'
              className={classes.link}>
              Your session has expired. Please log in again.
            </Button>
          );
          // todo open modal window to login again
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, []);

  // todo - add order numbers instead of #2001539 in Typography

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
              <Typography variant='body2' className={classes.instructions}>Your order number is #2001539.
                We have emailed your order confirmation, and will send you an update when your order has shipped.
                Thank you for your order.</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </Box>

          ) : (
            <Container>
              <Box>
                <Typography component='span' className={classes.instructions}>
                  {
                    getStepContent(activeStep, user)
                  }
                </Typography>
                <Box>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant='contained' color='primary' onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
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

const mapStoreToProps = store => {
  return {
    user: store.user,
    token: store.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setUser: data => dispatch(setUser(data))
  };
};

export default React.memo(connect(mapStoreToProps, mapDispatchToProps)(CheckoutStepper));