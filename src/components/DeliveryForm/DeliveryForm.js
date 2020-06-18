import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import globalConfig from '../../globalConfig';
import theme from './DeliveryTheme';
import { ThemeProvider } from '@material-ui/core';
import DefineDelivery from '../DefineDelivery/DefineDelivery';

const {deliveryOptions} = globalConfig;

const DeliveryForm = () => {
  const options = Object.values(deliveryOptions);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  // const data = {
  //   addresses: {
  //     address: user.address,
  //     house: user.house,
  //     apartment: user.apartment,
  //     postalCode: user.postalCode
  //   }
  return (
    <ThemeProvider theme={theme}>
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
                variant='outlined'
                size='small'/>}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DefineDelivery inputValue={inputValue}/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default React.memo(DeliveryForm);