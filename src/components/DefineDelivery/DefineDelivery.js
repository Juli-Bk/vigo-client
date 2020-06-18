import React from 'react';
import Grid from '@material-ui/core/Grid';
import globalConfig from '../../globalConfig';
import theme from '../DeliveryForm/DeliveryTheme';
import { ListItem, ThemeProvider } from '@material-ui/core';
import NovaPoshtaCity from '../PostOfficeForm/PostOfficeForm';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalPersDetails from '../ModalPersDetails/ModalPersDetails';
import ModalAddress from '../ModalAddress/ModalAddress';

const {deliveryOptions} = globalConfig;
const submitNovaPoshtaHandler = (values) => {
};
// todo get address from BD render static in case VIGO_COURIER_SERVICE
const DefineDelivery = (props) => {
  const {inputValue, user} = props;
  switch (inputValue) {
    case deliveryOptions.VIGO_COURIER_SERVICE:
      return (
        <ThemeProvider theme={theme}>
          <Grid item xs={12}>
            VIGO Courier will deliver the order to the following address:
            <Box>
              <ListItem className='listItem'>Address: {user.address}</ListItem>
              <ListItem className='listItem'>Phone Number: {user.phoneNumber}</ListItem>
            </Box>
            <ModalAddress/>
          </Grid>
        </ThemeProvider>
      );
    case deliveryOptions.NOVA_POSHTA:
      return (
        <NovaPoshtaCity submitNovaPoshtaHandler={submitNovaPoshtaHandler}/>
      );
    case deliveryOptions.UKRPOSHTA:
      return (
        <Grid item xs={12}>
          We will send your order to the following address:
          <Box p={1}>
            <ListItem className='listItem'>Address: {user.addresses}</ListItem>
            <ListItem className='listItem'>First Name: {user.firstName}</ListItem>
            <ListItem className='listItem'>Last Name: {user.lastName}</ListItem>
            <ListItem className='listItem'>Phone Number: {user.phoneNumber}</ListItem>
          </Box>
          <Box p={1}>
            <ModalPersDetails /><span>or</span><ModalAddress/>
          </Box>
        </Grid>
      );
    case deliveryOptions.PICKUP:
      return (
        <ThemeProvider theme={theme}>
          <Grid item xs={12} elevation={0}>
            <ListItem>If you've been notified that your VIGO order is ready for pickup, you are welcomed at our warehouse.
              Please bring your order number and a valid ID.</ListItem>
            <ListItem>Vigo Shop Ltd</ListItem>
            <ListItem>United Kingdom</ListItem>
            <ListItem>London 02587 </ListItem>
            <ListItem>Oxford Street 48/188</ListItem>
            <ListItem>Working days: Mon. - Sun.</ListItem>
            <ListItem>Working hours: 9 AM - 8 PM</ListItem>
          </Grid>
        </ThemeProvider>
      );
    default:
      return 'Unknown inputValue';
  }
};

const mapStoreToProps = store => {
  return {
    user: store.user
  };
};
DefineDelivery.propTypes = {
  inputValue: PropTypes.string
};
export default React.memo(connect(mapStoreToProps)(DefineDelivery));