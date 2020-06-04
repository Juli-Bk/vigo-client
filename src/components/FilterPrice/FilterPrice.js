import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, ThemeProvider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import CustomSlider from './CustomSlider';
import { setPriceRange } from '../../redux/actions/actions';
import { theme } from './FilterPriceTheme';

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
  const { maxProductsPrice, priceRange, setPriceRange } = props;
  const classes = useStyles(theme);

  const handleChange = (event, values) => {
    setPriceRange(values);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.filterPrice}>
        <Typography className={classes.label}>Price Filter: </Typography>
        <CustomSlider
          value={priceRange}
          min={0}
          max={maxProductsPrice}
          onChangeCommitted={handleChange}
          getAriaLabel={(value) => `$${value}`}
          valueLabelDisplay="on"
          valueLabelFormat={x => `$${x}`}
        />
      </Box>
    </ThemeProvider>
  );
};

FilterPrice.propTypes = {
  maxProductsPrice: PropTypes.number.isRequired,
  priceRange: PropTypes.array.isRequired,
  setPriceRange: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    priceRange: store.priceRange
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPriceRange: values => dispatch(setPriceRange(values))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(FilterPrice));