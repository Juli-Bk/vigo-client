import React from 'react';
import Grid from '@material-ui/core/Grid';
import theme from '../../styles/formStyle/formStyleTheme';
import { ListItem, ThemeProvider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles/formStyle/formStyle';

const VigoAddress = () => {
  const styles = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} elevation={0}>
        <Typography className={styles.subtitle}>
          If you've been notified that your VIGO order is ready for pickup,
          you are welcomed at our warehouse.
          Please bring your order number and a valid ID.
        </Typography>
        <ListItem className={styles.text}>Vigo Shop Ltd</ListItem>
        <ListItem className={styles.text}>United Kingdom</ListItem>
        <ListItem className={styles.text}>London 02587 </ListItem>
        <ListItem className={styles.text}>Oxford Street 48/188</ListItem>
        <ListItem className={styles.text}>Working days: Mon. - Sun.</ListItem>
        <ListItem className={styles.text}>Working hours: 9 AM - 8 PM</ListItem>
      </Grid>
    </ThemeProvider>
  );
};

export default React.memo(VigoAddress);