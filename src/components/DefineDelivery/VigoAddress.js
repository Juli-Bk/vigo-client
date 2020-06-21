import React from 'react';
import Grid from '@material-ui/core/Grid';
import theme from '../../styles/formStyle/formStyleTheme';
import { ThemeProvider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles/formStyle/formStyle';
import Box from '@material-ui/core/Box';

const VigoAddress = () => {
  const styles = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} elevation={0}>
        <Box>
          <Typography className={styles.subtitle}>
          If you've been notified that your VIGO order is ready for pickup,
          you are welcomed at our warehouse.
          Please bring your order number and a valid ID
          </Typography>
        </Box>
        <Box>
          <Typography className={styles.text}>Vigo Shop Ltd</Typography>
          <Typography className={styles.text}>United Kingdom</Typography>
          <Typography className={styles.text}>London 02587 </Typography>
          <Typography className={styles.text}>Oxford Street 48/188</Typography>
          <Typography className={styles.text}>Working days: Mon. - Sun.</Typography>
          <Typography className={styles.text}>Working hours: 9 AM - 8 PM</Typography>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default React.memo(VigoAddress);