import React from 'react';
import Grid from '@material-ui/core/Grid';
import theme from '../../styles/formStyle/formStyleTheme';
import { ListItem, ThemeProvider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ModalAddress from '../ModalAddress/ModalAddress';
import useStyles from '../../styles/formStyle/formStyle';
import AddressRadioGroup from './AddressRadioGroup';
import {isEmptyObj} from '../../helpers/helpers';

const UkrPoshtaData = (props) => {
  const {user} = props;
  const styles = useStyles();

  const userData = !isEmptyObj(user);
  const savedAddresses = user && user.addresses && user.addresses.length > 0;

  const adr = savedAddresses
    ? user.addresses.map(userAddress => {
        const {address, street, house, apartment, postalCode} = userAddress;
        const adrString = `${address} ${street || ''} ${house}/${apartment}, postalCode: ${postalCode} `;
        return <ListItem className={styles.text} key={address._id}>{adrString}</ListItem>;
      })
    : <ListItem className={styles.text}>Address: You have not saved address yet</ListItem>;

  const labels = userData
    ? <>
      <Typography className={styles.subtitle}>
        We will send your order to the following address:
      </Typography>
      <AddressRadioGroup value={adr} />
      <Box p={1}>
        {adr}
      </Box>
    </>
    : <Typography className={styles.subtitle}>
     Let`s add delivery address:
    </Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        {labels}
        <ModalAddress/>
      </Grid>
    </ThemeProvider>
  );
};

UkrPoshtaData.propTypes = {
  user: PropTypes.object
};

UkrPoshtaData.defaultProps = {
  user: {}
};

export default React.memo(UkrPoshtaData);