import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { colors } from '../../../styles/colorKit';
import { formPriceString } from '../../../helpers/helpers';
import globalConfig from '../../../globalConfig';
import { fonts } from '../../../styles/fonts/fontsKit';

const font = {
  color: colors.fontPrice,
  fontWeight: 'bold'
};

const useStyles = makeStyles(theme => ({
  salePrice: {
    ...font,
    fontSize: '1rem',
    [theme.breakpoints.up(1280)]: {
      fontSize: '1.2rem',
      letterSpacing: '.02em'
    }
  },
  unitPrice: {
    ...font,
    fontFamily: fonts.f1,
    fontSize: '1.5rem',
    [theme.breakpoints.up(1280)]: {
      fontSize: '1.7rem',
      letterSpacing: '.02em'
    }
  }
})
);

const SalePrice = (props) => {
  const classes = useStyles();
  const {value, isUnitPrice} = props;

  return <Typography
    variant='caption'
    component='p'
    className={isUnitPrice ? classes.unitPrice : classes.salePrice}>{formPriceString(value, globalConfig.priceIsInteger)}</Typography>;
};
SalePrice.propTypes = {
  value: PropTypes.number.isRequired,
  isUnitPrice: PropTypes.bool
};

export default React.memo(SalePrice);