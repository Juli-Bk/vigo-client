import React, { useMemo, useState } from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import globalConfig from '../../globalConfig';
import theme from '../../styles/formStyle/formStyleTheme';
import useStyles from '../../styles/formStyle/formStyle';
import { ThemeProvider } from '@material-ui/core';
import DefineDelivery from '../DefineDelivery/DefineDelivery';
import { setCompletedSteps, setShipping } from '../../redux/actions/actions';
import { getStorageData } from '../../helpers/helpers';

const {deliveryOptions} = globalConfig;

const DeliveryForm = (props) => {
  const {setShipping, setCompleted, activeStep, guestData, user} = props;
  const options = Object.values(deliveryOptions);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  const classes = useStyles();

  const guestInfo = useMemo(() => guestData.deliveryAddress
    ? guestData : getStorageData('guestData'), [guestData]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    setShipping(newInputValue);
    if (newInputValue === deliveryOptions.PICKUP || (guestInfo.deliveryAddress && guestInfo.deliveryAddress.length === 1) ||
            (user.deliveryAddress && user.deliveryAddress.length === 1)) {
      setCompleted(activeStep);
    }
  };
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
            onInputChange={handleInputChange}
            id='controllable-states-demo'
            options={options}
            style={{ width: '100%' }}
            renderInput={(params) =>
              <TextField {...params}
                name='delivery'
                className={classes.input}
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

const mapStateToProps = store => {
  return {
    activeStep: store.checkoutSteps.active,
    guestData: store.guestData,
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShipping: shipping => dispatch(setShipping(shipping)),
    setCompleted: step => dispatch(setCompletedSteps(step))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(DeliveryForm));