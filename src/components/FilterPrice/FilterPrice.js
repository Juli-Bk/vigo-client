import React, {useEffect, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import { Box, makeStyles, ThemeProvider } from '@material-ui/core';
import queryString from 'query-string';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import CustomSlider from './CustomSlider';
import {getMaxPrice} from '../../redux/actions/products';
import { theme } from './FilterPriceTheme';
import globalConfig from '../../globalConfig';

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
  const { maxPrice, getMaxPrice, location, history } = props;
  const classes = useStyles(theme);
  const parsed = useMemo(() => queryString.parse(location.search), [location.search]);

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
    parsed.minPrice = values[0];
    parsed.maxPrice = values[1];
    const updatedSearch = queryString.stringify(parsed);
    history.push(`/products/filter?${updatedSearch}`);
  }, [history, parsed]);

  const values = [Number(parsed.minPrice) || globalConfig.minDefaultPrice,
    Number(parsed.maxPrice) || globalConfig.maxDefaultPrice];

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.filterPrice}>
        <Typography className={classes.label}>Price Filter: </Typography>
        {maxPrice && <CustomSlider
          value={values}
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
  maxPrice: PropTypes.number.isRequired,
  getMaxPrice: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    maxPrice: store.maxPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMaxPrice: () => dispatch(getMaxPrice())
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterPrice)));