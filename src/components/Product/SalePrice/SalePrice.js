import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {colors} from '../../../styles/colorKit';
import {formPriceString} from '../../../helpers/helpers';
import globalConfig from '../../../globalConfig';
import {fonts} from '../../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
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
  const {value, isUnitPrice} = props;
  const classes = useStyles();

  const priceClass = isUnitPrice ? classes.unitPrice : classes.salePrice;
  const price = formPriceString(value, globalConfig.priceIsInteger);

  return <Typography
    variant='caption'
    component='p'
    className={priceClass}
  >
    {price}
  </Typography>;
};

SalePrice.propTypes = {
  value: PropTypes.number.isRequired,
  isUnitPrice: PropTypes.bool
};

export default React.memo(SalePrice);