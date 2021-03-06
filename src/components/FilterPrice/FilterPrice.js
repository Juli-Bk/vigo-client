import React, {useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Box, makeStyles, ThemeProvider} from '@material-ui/core';
import queryString from 'query-string';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import CustomSlider from './CustomSlider';
import {getMaxPrice} from '../../redux/actions/products';
import {theme} from './FilterPriceTheme';
import globalConfig from '../../globalConfig';

const useStyles = makeStyles(theme => ({
  margin: {
    height: theme.spacing(3)
  },
  filterPrice: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '.5rem',
    paddingLeft: 4
  },
  label: {
    fontSize: '1.3rem',
    marginRight: '.5rem',
    color: 'rgba(0,0,0,0.54)'
  }
}));

const FilterPrice = (props) => {
  const {
    maxPrice,
    getMaxPrice,
    location,
    history
  } = props;
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
    parsed.startPage = 1;
    const updatedSearch = queryString.stringify(parsed);
    history.push(`/products/filter?${updatedSearch}`);
  }, [history, parsed]);

  const values = [Number(parsed.minPrice) || globalConfig.minDefaultPrice,
    Number(parsed.maxPrice) || globalConfig.maxDefaultPrice];

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.filterPrice}>
        <Typography className={classes.label}>Price: </Typography>
        {
          maxPrice > 0
            ? <CustomSlider
              value={values}
              min={0}
              max={maxPrice}
              onChangeCommitted={handleChange}
              getAriaLabel={(value) => `$${value}`}
              valueLabelDisplay="on"
              valueLabelFormat={x => `$${x}`}
            />
            : null
        }
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
    maxPrice: store.stock && store.stock.maxPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMaxPrice: () => dispatch(getMaxPrice())
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterPrice)));