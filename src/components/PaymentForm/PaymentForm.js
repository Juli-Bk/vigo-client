import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../components/RegisterForm/RegisterFormStyle';
import globalConfig from '../../globalConfig';
import CardForm from '../CardForm/CardForm';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../DeliveryForm/DeliveryTheme';
import { Card, ListItem } from '@material-ui/core';

const {paymentOptions} = globalConfig;
function definePayment (inputValue) {
  switch (inputValue) {
    case paymentOptions.BY_CASH:
      return (
        <ThemeProvider theme={theme}>
          <Card elevation={0}>
            <ListItem>We accept cash at our VIGO Shop office.
              Please bring your order number and a valid ID.</ListItem>
            <ListItem>Vigo Shop Ltd</ListItem>
            <ListItem>United Kingdom</ListItem>
            <ListItem>London 02587 </ListItem>
            <ListItem>Oxford Street 48/188</ListItem>
            <ListItem>Working days: Mon. - Sun.</ListItem>
            <ListItem>Working hours: 9 AM - 8 PM</ListItem>
          </Card>
        </ThemeProvider>
      );
    case paymentOptions.CREDIT_CARD:
      return (
        <CardForm submitCardHandler={(result) => {
          // todo collect card details
          console.log('register result', result);
        }}/>
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
  const [inputValue, setInputValue] = useState(['']);
  const styles = useStyles;
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} >
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
    </ThemeProvider>
  );
};
export default React.memo(PaymentForm);