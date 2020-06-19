import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { colors } from '../../../styles/colorKit';

const useStyles = makeStyles({
  quantityBox: {
    display: 'flex',
    justifyContent: 'center'
  },
  btn: {
    fontSize: '1rem'
  },
  active: {
    color: colors.fontFourth
  },
  disabled: {
    color: colors.thinLine
  }
});

const Quantity = (props) => {
  const {quantity, max} = props;
  const classes = useStyles();
  return (
    <Box className={classes.quantityBox}>
      <Typography variant='p'
        className={classes.btn}>-</Typography>
      <Typography variant='p'
        className={classes.active}>
        {quantity || 1}
      </Typography>
      <Typography variant='p'
        className={classes.btn}>+</Typography>
    </Box>
  );
};

export default React.memo(Quantity);