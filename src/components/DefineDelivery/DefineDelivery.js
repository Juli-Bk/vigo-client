import React from 'react';
import globalConfig from '../../globalConfig';
import NovaPoshtaCity from '../PostOfficeForm/PostOfficeForm';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VigoAddress from './VigoAddress';
import UserAddressData from './UserAddressData';
import GuestAddressData from './GuestAddressData';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles/formStyle/formStyle';
import {ThemeProvider} from '@material-ui/core';
import theme from '../../styles/formStyle/formStyleTheme';

const {deliveryOptions} = globalConfig;

const submitNovaPoshtaHandler = (values) => {
};

const DefineDelivery = (props) => {
  const {inputValue, user, guestData} = props;
  const styles = useStyles();
  let children = null;

  const filledUserData = Object.entries(user).length > 0;
  const fields = filledUserData
    ? <UserAddressData user={user}/>
    : <GuestAddressData guestData={guestData}/>;

  switch (inputValue) {
    case deliveryOptions.VIGO_COURIER_SERVICE:
      children = fields;
      break;

    case deliveryOptions.NOVA_POSHTA:
      children = <NovaPoshtaCity submitNovaPoshtaHandler={submitNovaPoshtaHandler}/>;
      break;

    case deliveryOptions.UKRPOSHTA:
      children = fields;
      break;

    case deliveryOptions.PICKUP:
      children = <VigoAddress/>;
      break;

    default:
      children = <Typography variant='subtitle2' className={styles.text}>
        Please, select delivery option
      </Typography>;
  }
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

const mapStoreToProps = store => {
  return {
    user: store.user,
    guestData: store.guestData
  };
};
DefineDelivery.propTypes = {
  inputValue: PropTypes.string
};
export default React.memo(connect(mapStoreToProps)(DefineDelivery));