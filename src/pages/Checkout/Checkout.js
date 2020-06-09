import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from '../MyAccount/MyAccountStyle';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import CheckoutStepper from '../../components/CheckoutStepper/CheckoutStepper';

const Checkout = () => {
  const styles = useStyles();
  return (
    <Container>
      <Typography variant="h5" className={styles.header} gutterBottom>
        Checkout
      </Typography>
      <Paper elevation={3}>
        <CheckoutStepper />
      </Paper>
    </Container>
  );
};

export default React.memo(Checkout);