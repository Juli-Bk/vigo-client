import React from 'react';
import Grid from '@material-ui/core/Grid';
import theme from '../../styles/formStyle/formStyleTheme';
import {ThemeProvider} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ModalAddress from '../ModalAddress/ModalAddress';
import useStyles from '../../styles/formStyle/formStyle';
import AddressRadioGroup from './AddressRadioGroup';

const UserAddressData = (props) => {
  const {user} = props;
  const styles = useStyles();

  const isEmptyUserData = Object.keys(user).length <= 0;
  const hasSavedAddresses = user && user.addresses && user.addresses.length > 0;

  const adr = hasSavedAddresses
    ? user.addresses.map(address => {
      const tags = [];
      for (const [key, value] of Object.entries(address)) {
        if (key !== '_id') {
          // todo if more than 1 address - make checkboxes
          tags.push(
            <Typography className={styles.text} key={key}>
              <Typography component='span'>
                {`${key}: `}
              </Typography>
              <Typography component='span'>
                {`${value}`}
              </Typography>
            </Typography>
          );
        }
      }
      return tags;
    })
    : null;

  const labels = !isEmptyUserData && !hasSavedAddresses
    ? <Typography className={styles.subtitle}>
      Let`s add some delivery address
    </Typography>
    : <>
      <Typography className={styles.subtitle}>
        We will send your order to the following address:
      </Typography>

      <Box p={1}>
        {/* todo if many addresses - make checkboxes here */}
        <AddressRadioGroup value={adr} />
      </Box>
    </>;

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        {labels}
        <ModalAddress/>
      </Grid>
    </ThemeProvider>
  );
};

UserAddressData.propTypes = {
  user: PropTypes.object
};

UserAddressData.defaultProps = {
  user: {}
};

export default React.memo(UserAddressData);