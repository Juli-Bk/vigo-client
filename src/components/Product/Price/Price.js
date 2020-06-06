import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { colors } from '../../../styles/colorKit';
import { formPriceString } from '../../../helpers/helpers';
import globalConfig from '../../../globalConfig';

const useStyles = makeStyles(theme => ({
  price: {
    textDecoration: 'line-through',
    color: colors.fontSixth,
    fontSize: '1rem',
    [theme.breakpoints.up(1280)]: {
      marginRight: '1rem',
      fontSize: '1.2rem',
      letterSpacing: '.02em'
    }
  }
})
);

const Price = (props) => {
  const classes = useStyles();
  const {value} = props;

  return <Typography variant='caption' component='p' className={classes.price}>{formPriceString(value, globalConfig.priceIsInteger)}</Typography>;
};

export default React.memo(Price);