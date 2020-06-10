import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../components/RegisterForm/RegisterFormStyle';
import globalConfig from '../../globalConfig';
import CardForm from '../CardForm/CardForm';

const {paymentOptions} = globalConfig;
function definePayment (inputValue) {
  switch (inputValue) {
    case paymentOptions.BY_CASH:
      return (
        <Typography>We accept cash at our VIGO warehous:  19 W 103rd St, New York, NY
        </Typography>
      );
    case paymentOptions.CREDIT_CARD:
      return (
        <CardForm />
      );
    case paymentOptions.PRYVAT24:
      return (
        ''
      );
    case paymentOptions.GOOGLE_PAY:
      return (
        ''
      );
    default:
      return 'Unknown inputValue';
  }
}
const PaymentForm = () => {
  const options = Object.values(paymentOptions);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  const styles = useStyles;
  return (
    <Container>
      <Typography variant='h6' gutterBottom>
        Payment options
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={6} >
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id='controllable-states-demo'
            options={options}
            style={{ width: '100%' }}
            renderInput={(params) =>
              <TextField {...params}
                name='payment'
                className={styles.input}
                label='Payment options'
                variant='outlined' />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {definePayment(value)}
        </Grid>
      </Grid>
    </Container>
  );
};
export default React.memo(PaymentForm);