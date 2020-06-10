import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import globalConfig from '../../globalConfig';
import theme from './DeliveryTheme';
import { Box, Card, ListItem, ThemeProvider } from '@material-ui/core';

const {deliveryOptions} = globalConfig;

// todo get address from BD render static in case VIGO_COURIER_SERVICE
function defineDelivery (inputValue) {
  switch (inputValue) {
    case deliveryOptions.VIGO_COURIER_SERVICE:
      return (
        <Box>current user's delivery address</Box>
      );
    case deliveryOptions.NOVA_POSHTA:
      return (
        ''
      );
    case deliveryOptions.DHL_EXPRESS:
      return (
        ''
      );
    case deliveryOptions.FEDEX:
      return (
        ''
      );
    case deliveryOptions.PICKUP:
      return (
        <ThemeProvider theme={theme}>
          <Card elevation={0}>
            <Box>
              <ListItem>If you've been notified that your VIGO order is ready for pickup, you are welcomed at our warehouse.
              Please bring your order number and a valid ID.</ListItem>
              <ListItem>Vigo Shop Ltd</ListItem>
              <ListItem>United Kingdom</ListItem>
              <ListItem>London 02587 </ListItem>
              <ListItem>Oxford Street 48/188</ListItem>
              <ListItem>Working days: Mon. - Sun.</ListItem>
              <ListItem>Working hours: 9 AM - 8 PM</ListItem>
            </Box>

          </Card>
        </ThemeProvider>
      );
    case deliveryOptions.POST_OFFICE:
      return ''
      ;
    default:
      return 'Unknown inputValue';
  }
}

const DeliveryForm = () => {
  const options = Object.values(deliveryOptions);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');

  return (
    <Container>
      <Typography variant='h6' gutterBottom>
        Delivery options
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
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
                name='delivery'
                label='Delivery options'
                variant='outlined' />}
          />
        </Grid>
        <Grid item xs={12} md={6} >
          {defineDelivery(value)}
        </Grid>
      </Grid>
    </Container>

  );
};
export default React.memo(DeliveryForm);