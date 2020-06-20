import React, {useCallback, useState} from 'react';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {colors} from '../../styles/colorKit';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import theme from './CheckoutStepperTheme';
import DeliveryForm from '../DeliveryForm/DeliveryForm';
import {Container} from '@material-ui/core';
import PaymentForm from '../PaymentForm/PaymentForm';
import {connect} from 'react-redux';
import {setLoginModalOpenState, setPersDetailsOpenState} from '../../redux/actions/actions';
import { setUser} from '../../redux/actions/user';
import ModalPersDetails from '../ModalPersDetails/ModalPersDetails';
import NewCustomerForm from '../../components/NewCustomerForm/NewCustomerForm';
import useCommonStyles from '../../styles/formStyle/formStyle';

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
  const {setLoginModalOpenState, setPersDetailsOpenState, token} = props;
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [guest, setGuest] = useState({radioGroup: null});

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

  const getStepContent = (stepIndex) => {
    let fields = null;
    const asAGuest = guest.radioGroup && guest.radioGroup === 'asGuest';
    switch (stepIndex) {
      case 0:
        // todo при существующем в куки токене и обновлении страницы
        // ModalPersDetails не подтягивает данные пользователя в форму
        // так как в сторедже токен пустой
        if (token || asAGuest) {
          fields = <ModalPersDetails/>;
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

const mapStateToProps = store => {
  return {
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

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CheckoutStepper));