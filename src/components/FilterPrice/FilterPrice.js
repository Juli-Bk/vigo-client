import React, {useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, ThemeProvider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import CustomSlider from './CustomSlider';
import { setPriceRange } from '../../redux/actions/actions';
import {getMaxPrice} from '../../redux/actions/products';
import { theme } from './FilterPriceTheme';
import {has} from '../../helpers/helpers';

const useStyles = makeStyles(theme => ({
  margin: {
    height: theme.spacing(3)
  },
  filterPrice: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: '.5rem'
  },
  label: {
    fontSize: '.8rem',
    display: 'none',
    [theme.breakpoints.up(500)]: {
      display: 'block'
    },
    [theme.breakpoints.up(1280)]: {
      fontSize: '1rem'
    }
  }
}));

const FilterPrice = (props) => {
  const { maxPrice, filters, setPriceRange, getMaxPrice } = props;
  const classes = useStyles(theme);

  useEffect(() => {
    let isCanceled = false;

    if (!isCanceled) {
      getMaxPrice();
    }
    return () => {
      isCanceled = true;
    };
  }, [getMaxPrice]);

  const handleChange = useCallback((event, values) => {
    setPriceRange(values);
  }, [setPriceRange]);

  const values = [];

  values[0] = filters.find(item => {
    return has(item, 'minPrice');
  }).minPrice;
  values[1] = filters.find(item => {
    return has(item, 'maxPrice');
  }).maxPrice;

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.filterPrice}>
        <Typography className={classes.label}>Price Filter: </Typography>
        {maxPrice && <CustomSlider
          value={[filters[0].minPrice, filters[1].maxPrice]}
          min={0}
          max={maxPrice}
          onChangeCommitted={handleChange}
          getAriaLabel={(value) => `$${value}`}
          valueLabelDisplay="on"
          valueLabelFormat={x => `$${x}`}
        />}
      </Box>
    </ThemeProvider>
  );
};

FilterPrice.propTypes = {
  filters: PropTypes.array.isRequired,
  setPriceRange: PropTypes.func.isRequired,
  maxPrice: PropTypes.number.isRequired,
  getMaxPrice: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    filters: store.filters,
    maxPrice: store.maxPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMaxPrice: () => dispatch(getMaxPrice()),
    setPriceRange: values => dispatch(setPriceRange(values))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(FilterPrice));