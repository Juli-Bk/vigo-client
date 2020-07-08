import React, { useCallback } from 'react';
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
import { setCompletedSteps, setGuestData } from '../../redux/actions/actions';
import { setUserDeliveryAddress, setUserNovaPoshtaData } from '../../redux/actions/user';
import { getStorageData, setStorageData } from '../../helpers/helpers';

const {deliveryOptions} = globalConfig;

const DefineDelivery = (props) => {
  const {
    inputValue, user, guestData, activeStep,
    setCompleted, setGuestData, setUserNovaPoshtaData
  } = props;
  const styles = useStyles();
  const filledUserData = Object.entries(user).length > 0;

  const submitNovaPoshtaHandler = useCallback((inputValue, values) => {
    setCompleted(activeStep);

    const data = {
      city: inputValue,
      office: values.npOffice
    };

    const updatedGuestData = {...guestData, novaPoshta: data};
    const guestInfo = getStorageData('guestData');
    const updatedInfo = {...guestInfo, novaPoshta: data};
    setStorageData('guestData', updatedInfo);

    filledUserData ? setUserNovaPoshtaData(data) : setGuestData(updatedGuestData);
  }, [activeStep, filledUserData, guestData, setCompleted, setGuestData, setUserNovaPoshtaData]);

  const getStepContent = useCallback(inputValue => {
    const fields = filledUserData
      ? <UserAddressData user={user}/>
      : <GuestAddressData guestData={guestData}/>;

    switch (inputValue) {
      case deliveryOptions.VIGO_COURIER_SERVICE:
        return fields;
      case deliveryOptions.NOVA_POSHTA:
        return <NovaPoshtaCity submitNovaPoshtaHandler={submitNovaPoshtaHandler}/>;
      case deliveryOptions.UKRPOSHTA:
        return fields;
      case deliveryOptions.PICKUP:
        return <VigoAddress/>;
      default:
        return <Typography variant='subtitle2' className={styles.text}>
          Please, select delivery option
        </Typography>;
    }
  }, [filledUserData, guestData, styles.text, submitNovaPoshtaHandler, user]);

  return (
    <ThemeProvider theme={theme}>
      {getStepContent(inputValue)}
    </ThemeProvider>
  );
};

DefineDelivery.propTypes = {
  inputValue: PropTypes.string,
  setCompleted: PropTypes.func.isRequired,
  setGuestData: PropTypes.func.isRequired,
  setUserDeliveryAddress: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  guestData: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired
};

const mapStoreToProps = store => {
  return {
    user: store.user,
    guestData: store.guestData,
    activeStep: store.checkoutSteps.active
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCompleted: step => dispatch(setCompletedSteps(step)),
    setGuestData: data => dispatch(setGuestData(data)),
    setUserDeliveryAddress: address => dispatch(setUserDeliveryAddress(address)),
    setUserNovaPoshtaData: data => dispatch(setUserNovaPoshtaData(data))
  };
};

export default React.memo(connect(mapStoreToProps, mapDispatchToProps)(DefineDelivery));