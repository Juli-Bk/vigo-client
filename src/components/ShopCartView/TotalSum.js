import React from 'react';
import {Box, makeStyles, Typography, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  container: {

  },
  subtotal: {

  },
  total: {

  },
  text: {

  }
}));

const TotalSum = (props) => {
  const {subtotal, tax, shipping} = props;
  const classes = useStyles();

  const total = subtotal + shipping + tax;
  // todo table
  return (
    <Box>
      <Box className={classes.text}>
        <Typography className={classes.subtotal}>Subtotal: {subtotal}</Typography>
        <Typography className={classes.subtotal}>Shipping (0%): {shipping}</Typography>
        <Typography className={classes.subtotal}>Tax (0%): {tax}</Typography>
        <Typography className={classes.total}>Total: {total}</Typography>
      </Box>
      <Button><Link to={'/checkout'}>Checkout</Link></Button>
    </Box>
  );
};

export default TotalSum;