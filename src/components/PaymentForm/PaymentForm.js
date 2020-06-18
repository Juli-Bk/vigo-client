import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import globalConfig from '../../globalConfig';
import { ThemeProvider } from '@material-ui/styles';
import theme from './PaymentFormTheme';
import { Button, Typography, Card, Link, ListItem } from '@material-ui/core';

const {paymentOptions} = globalConfig;
function definePayment (inputValue) {
  switch (inputValue) {
    case paymentOptions.BY_CASH:
      return (
        <ThemeProvider theme={theme}>
          <Card elevation={0}>
            <Typography>We accept cash at our VIGO Shop office.
              Please bring your order number and a valid ID.</Typography>
            <ListItem>Vigo Shop Ltd</ListItem>
            <ListItem>United Kingdom</ListItem>
            <ListItem>London 02587 </ListItem>
            <ListItem>Oxford Street 48/188</ListItem>
            <ListItem>Working days: Mon. - Sun.</ListItem>
            <ListItem>Working hours: 9 AM - 8 PM</ListItem>
          </Card>
        </ThemeProvider>
      );
    case paymentOptions.LIQ_PAY:
      return (
        <ThemeProvider theme={theme}>
          <Link href="https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXkiLCJwdWJsaWNfa2V5IjoiaTkzODkzMjAzNTY0IiwiYW1vdW50IjoiNSIsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiLQnNC%2B0Lkg0YLQvtCy0LDRgCIsInR5cGUiOiJidXkiLCJsYW5ndWFnZSI6ImVuIn0%3D&signature=qfXnJw%2BIj4LWZZdkhKf8CF7uJkw%3D" target="_blank">
            <Button fullWidth>Pay</Button>
          </Link>
        </ThemeProvider>
      );
    default:
      return 'Unknown inputValue';
  }
}
const PaymentForm = () => {
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
          {definePayment(value)}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default React.memo(PaymentForm);