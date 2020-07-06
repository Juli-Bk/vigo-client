import React, { useState } from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import globalConfig from '../../globalConfig';
import { ThemeProvider } from '@material-ui/styles';
import theme from './PaymentFormTheme';
import VigoAddress from '../../components/DefineDelivery/VigoAddress';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles/formStyle/formStyle';
import { setCompletedSteps, setPaymentMethod } from '../../redux/actions/actions';

const {paymentOptions} = globalConfig;
function definePayment (inputValue, styles) {
  switch (inputValue) {
    case paymentOptions.BY_CASH:
      return <VigoAddress/>;
    case paymentOptions.LIQ_PAY:
      return null;
    default:
      return <Typography variant='subtitle2' className={styles.text}>
        Please, select payment option
      </Typography>;
  }
}
const PaymentForm = (props) => {
  const styles = useStyles();
  const {setPaymentMethod, setCompleted, activeStep} = props;
  const options = Object.values(paymentOptions);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} >
          <Autocomplete
            name='autopayment'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              setPaymentMethod(newInputValue);
              setCompleted(activeStep);
            }}
            id='controllable-states-demo'
            options={options}
            style={{ width: '100%' }}
            renderInput={(params) =>
              <TextField {...params}
                name='payment'
                label='Payment options'
                variant='outlined' />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {definePayment(value, styles)}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const mapStateToProps = store => {
  return {
    activeStep: store.checkoutSteps.active
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPaymentMethod: method => dispatch(setPaymentMethod(method)),
    setCompleted: step => dispatch(setCompletedSteps(step))
  };
};
export default React.memo(connect(mapStateToProps, mapDispatchToProps)(PaymentForm));