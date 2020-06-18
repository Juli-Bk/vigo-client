import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { colors } from '../../styles/colorKit';
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
import { setUser, setLoginModalOpenState, setPersDetailsOpenState} from '../../redux/actions/actions';
import ModalPersDetails from '../ModalPersDetails/ModalPersDetails';
import NewCustomerForm from '../../components/NewCustomerForm/NewCustomerForm';
import PropTypes from 'prop-types';
import useCommonStyles from '../../styles/formStyle/formStyle';
import ModalLogin from '../ModalLogin/ModalLogin';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1),
    backgroundColor: colors.borderLight,
    color: colors.fontOncard
  },
  instructions: {
    padding: 20
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

const steps = ['Personal data', 'Delivery Info', 'Payment Info', 'Complete your order'];

const CheckoutStepper = (props) => {
  const {token, setLoginModalOpenState, setPersDetailsOpenState} = props;
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [guest, setGuest] = useState({radioGroup: null});

  // если пользователь - гость
  //                     показать форму сразу заполнения данных о себе для заказа. когда заполнит, где то сохранить
  //                     для последующей обработки заказа

  // если пользователь в процессе чекаута просто сделал паузу и токен протух,(как это узнать)
  //                    показываем ему окно логина

  // todo write handler on new Customer form
  const onSubmitCallback = (values, callback) => {
    callback();
    if (values.radioGroup === 'iWillRegister') {
      setLoginModalOpenState(true);
    }
    if (values.radioGroup === 'asGuest') {
      setPersDetailsOpenState(true);
    }
    setGuest({radioGroup: values.radioGroup});
  };

  const getStepContent = (stepIndex, user) => {
    let fields = null;
    switch (stepIndex) {
      case 0:
        if (token) {
          // если пользователь залогине- подтягивать его сохраненные данные, и показывать кнопку изменить данные
          // как эта инфа о пользователе пропихивается дальше
          fields = <Box display='flex' flexWrap="wrap">
            <Box p={1}>
              <ListItem>First Name:<br/>  {user.firstName}</ListItem>
              <ListItem>Last Name: <br/>  {user.lastName}</ListItem>
              <ListItem>Phone Number: <br/>  {user.phoneNumber}</ListItem>
              <ListItem>Email: <br/> {user.email}</ListItem>
              <ListItem>Address: <br/>  {user.address}</ListItem>
            </Box>
            <Box p={1}>
              <ModalPersDetails />
            </Box>
          </Box>;
        } else if (guest.radioGroup) {
          if (guest.radioGroup === 'iWillRegister') {
            fields = <>
              <NewCustomerForm submitNewCustomerHandler={onSubmitCallback}/>
              <ModalLogin/>
            </>;
          } else {
            fields = <ModalPersDetails />;
          }
        } else {
          fields = <NewCustomerForm submitNewCustomerHandler={onSubmitCallback}/>;
        }
        return (
          fields
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
    const cookieToken = getJWTfromCookie();
    if (token || cookieToken) {
      AjaxUtils.Users.getUser()
        .then(result => {
          if (result) {
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
    return () => {
      isCanceled = true;
    };
  }, [classes.link, token]);

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
                <Box className={classes.buttonContainer}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={commonClasses.button}
                  >
                    {'<'}
                  </Button>
                  <Button className={commonClasses.button}
                    onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Place order' : '>'}
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
    setUser: data => dispatch(setUser(data)),
    setLoginModalOpenState: isOpen => dispatch(setLoginModalOpenState(isOpen)),
    setPersDetailsOpenState: isOpen => dispatch(setPersDetailsOpenState(isOpen))
  };
};

CheckoutStepper.propTypes = {
  token: PropTypes.string.isRequired
};

export default React.memo(connect(mapStoreToProps, mapDispatchToProps)(CheckoutStepper));