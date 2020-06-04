import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';
import { calculateSale } from '../../../helpers/helpers';

const useStyles = makeStyles({
  saleInfo: {
    position: 'absolute',
    top: '3%',
    left: '5%',
    width: 'fit-content',
    padding: '.1em .2em',
    color: colors.noticeColor,
    fontWeight: 'bold',
    fontSize: '1.2em',
    fontFamily: fonts.f3,
    textTransform: 'uppercase',
    border: `2px solid ${colors.noticeColor}`,
    borderRadius: 2
  }
});

const SaleInfoBox = (props) => {
  const classes = useStyles();
  const {price, salePrice} = props;

  return <Box className={classes.saleInfo}>{calculateSale(price, salePrice)}</Box>;
};

SaleInfoBox.propTypes = {
  price: PropTypes.number.isRequired,
  salePrice: PropTypes.number.isRequired
};
export default React.memo(SaleInfoBox);