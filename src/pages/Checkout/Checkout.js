import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './Checkout';
import Paper from '@material-ui/core/Paper';
import { Grid, Container } from '@material-ui/core';

const Checkout = () => {
  const styles = useStyles();
  return (
    <Container>
      <Typography variant="h5" className={styles.header} gutterBottom>
        Checkout
      </Typography>

      <Paper elevation={3}>
        <Grid container spacing={2}>

        </Grid>
        payment & delivery forms here
      </Paper>
    </Container>
  );
};

export default Checkout;