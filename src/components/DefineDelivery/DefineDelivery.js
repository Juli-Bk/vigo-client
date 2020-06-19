import React from 'react';
import globalConfig from '../../globalConfig';
import NovaPoshtaCity from '../PostOfficeForm/PostOfficeForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VigoAddress from './VigoAddress';
import UkrPoshtaData from './UkrPoshtaData';
import CourierDelivery from './CourierDelivery';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles/formStyle/formStyle';
const {deliveryOptions} = globalConfig;

const submitNovaPoshtaHandler = (values) => {
};

const DefineDelivery = (props) => {
  const {inputValue, user} = props;
  const styles = useStyles();

  switch (inputValue) {
    case deliveryOptions.VIGO_COURIER_SERVICE:
      return <CourierDelivery user={user}/>;

    case deliveryOptions.NOVA_POSHTA:
      return <NovaPoshtaCity submitNovaPoshtaHandler={submitNovaPoshtaHandler}/>;

    case deliveryOptions.UKRPOSHTA:
      return <UkrPoshtaData user={user}/>;

    case deliveryOptions.PICKUP:
      return <VigoAddress/>;

    default:
      return <Typography variant='subtitle2' className={styles.text}>Please, select delivery option</Typography>;
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