import React from 'react';
import Grid from '@material-ui/core/Grid';
import theme from '../../styles/formStyle/formStyleTheme';
import { ThemeProvider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ModalAddress from '../ModalAddress/ModalAddress';
import useStyles from '../../styles/formStyle/formStyle';

const GuestAddressData = (props) => {
  const {guestData} = props;
  const styles = useStyles();

  const isEmptyUserData = Object.keys(guestData).length <= 0;
  const hasSavedAddresses = guestData && guestData.deliveryAddress;

  const tags = [];
  if (hasSavedAddresses) {
    for (const [key, value] of Object.entries(guestData.deliveryAddress)) {
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

  const labels = !isEmptyUserData && !hasSavedAddresses
    ? <Typography className={styles.subtitle}>
      Let`s add delivery address:
    </Typography>
    : <>
      <Typography className={styles.subtitle}>
        We will send your order to the following address:
      </Typography>
      <Box>
        {tags}
      </Box>
    </>;

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        {labels}
        <ModalAddress component='span'/>
      </Grid>
    </ThemeProvider>
  );
};

GuestAddressData.propTypes = {
  guestData: PropTypes.object
};

GuestAddressData.defaultProps = {
  guestData: {}
};
export default React.memo(GuestAddressData);