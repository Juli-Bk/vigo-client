import React from 'react';
import Grid from '@material-ui/core/Grid';
import theme from '../../styles/formStyle/formStyleTheme';
import { ListItem, ThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ModalAddress from '../ModalAddress/ModalAddress';
import useStyles from '../../styles/formStyle/formStyle';
import AddressRadioGroup from './AddressRadioGroup';

const CourierDelivery = (props) => {
  const { user } = props;
  const styles = useStyles();

  const isEmptyUserData = Object.keys(user).length > 0;
  const savedAddresses = user && user.addresses && user.addresses.length > 0;

  const adr = savedAddresses
    ? user.addresses.map(address => {
      const adrString = `${address.address} ${address.street || ''} ${address.house}/${address.apartment}, postalCode: ${address.postalCode} `;
      return <ListItem className={styles.text} key={address._id}>Address: {adrString}</ListItem>;
    })
    : <ListItem className={styles.text}>Address: You have not saved address yet</ListItem>;

  const labels = isEmptyUserData
    ? <>
      <Typography className={styles.subtitle}>
        VIGO Courier will deliver the order to the following address:
      </Typography>
      <AddressRadioGroup value={adr} />
    </>
    : <Typography className={styles.subtitle}>
      Let`s add delivery address:
    </Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        {labels}
        <ModalAddress component='span'/>
      </Grid>
    </ThemeProvider>
  );
};

CourierDelivery.propTypes = {
  user: PropTypes.object
};

CourierDelivery.defaultProps = {
  user: {}
};
export default React.memo(CourierDelivery);