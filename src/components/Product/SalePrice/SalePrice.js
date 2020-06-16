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
  subTotal: {
    color: colors.noticeColor,
    fontWeight: 'bold',
    fontFamily: fonts.f1,
    fontSize: '1.5rem',
    [theme.breakpoints.up(1280)]: {
      fontSize: '1.7rem',
      letterSpacing: '.02em'
    }
  },
  salePrice: {
    color: colors.fontPrice,
    fontWeight: 'bold',
    fontSize: '1rem',
    [theme.breakpoints.up(1280)]: {
      fontSize: '1.2rem',
      letterSpacing: '.02em'
    }
  },
  unitPrice: {
    color: colors.fontPrice,
    fontWeight: 'bold',
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
  const {value, isUnitPrice, isSubTotal} = props;
  const classes = useStyles();

  return <Typography
    variant='caption'
    component='p'
    className={isSubTotal ? classes.subTotal : (isUnitPrice ? classes.unitPrice : classes.salePrice)}>{formPriceString(value, globalConfig.priceIsInteger)}</Typography>;
};
SalePrice.propTypes = {
  value: PropTypes.number.isRequired,
  isUnitPrice: PropTypes.bool
};

export default React.memo(SalePrice);