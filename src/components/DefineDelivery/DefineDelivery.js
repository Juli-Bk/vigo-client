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
import { setCompletedSteps } from '../../redux/actions/actions';

const {deliveryOptions} = globalConfig;

const DefineDelivery = (props) => {
  const {inputValue, user, guestData, activeStep, setCompleted} = props;
  const styles = useStyles();

  const submitNovaPoshtaHandler = useCallback((values) => {
    setCompleted(activeStep);
    console.log(values);
  }, [activeStep, setCompleted]);

  const filledUserData = Object.entries(user).length > 0;

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
  inputValue: PropTypes.string
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
    setCompleted: step => dispatch(setCompletedSteps(step))
  };
};

export default React.memo(connect(mapStoreToProps, mapDispatchToProps)(DefineDelivery));