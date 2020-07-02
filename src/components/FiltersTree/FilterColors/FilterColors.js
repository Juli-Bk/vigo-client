import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {ThemeProvider} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getAllColors } from '../../../redux/actions/colors';
import theme from './FilterColorsTheme';
import useStyles from './FilterColorsStyles';
import { getFilterString, getUrlData, getColorsState } from '../../../helpers/helpers';

const FilterColors = (props) => {
  const {allColors, getAllColors, history, location} = props;
  const classes = useStyles();
  const parsed = useMemo(() => queryString.parse(location.search), [location.search]);
  const dataFromSearchString = useMemo(() => getUrlData(parsed, 'color'), [parsed]);

  const state = useMemo(() =>
    getColorsState(allColors, dataFromSearchString),
  [allColors, dataFromSearchString]);

  useEffect(() => {
    let isCanceled = false;

    if (!isCanceled) {
      getAllColors();
    }
    return () => {
      isCanceled = true;
    };
  }, [getAllColors]);

  const handleChange = useCallback((event) => {
    const updatedParsed = getFilterString(parsed, 'color', event.target.name);
    const updatedSearch = queryString.stringify(updatedParsed);
    history.push(`/products/filter?${updatedSearch}`);
  }, [history, parsed]);

  const createCheckboxes = useCallback((namesArray) => {
    return namesArray.map(color => {
      return <FormControlLabel
        className={classes.label}
        checked={state[color.name]}
        key={color.name + color.hex}
        label={color.name}
        control={
          <Checkbox
            onChange={handleChange}
            name={color.name}
            color="default"
          />
        }/>;
    });
  }, [classes.label, handleChange, state]);

  return (
    <ThemeProvider theme={theme}>
      {allColors && allColors.length && createCheckboxes(allColors)}
    </ThemeProvider>
  );
};

FilterColors.propTypes = {
  getAllColors: PropTypes.func.isRequired,
  allColors: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  return {
    allColors: store.allColors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllColors: () => dispatch(getAllColors())
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterColors)));