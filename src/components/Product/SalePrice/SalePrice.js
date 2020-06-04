import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { colors } from '../../../styles/colorKit';
import { formPriceString } from '../../../helpers/helpers';
import globalConfig from '../../../globalConfig';

const useStyles = makeStyles(theme => ({
  salePrice: {
    color: colors.fontPrice,
    fontWeight: 'bold',
    [theme.breakpoints.up(1280)]: {
      fontSize: '1rem',
      letterSpacing: '.02em'
    }
  }
})
);

const SalePrice = (props) => {
  const classes = useStyles();
  const {value} = props;

  return <Typography
    variant='caption'
    component='p'
    className={classes.salePrice}>{formPriceString(value, globalConfig.priceIsInteger)}</Typography>;
};
SalePrice.propTypes = {
  value: PropTypes.number.isRequired
};

export default React.memo(SalePrice);