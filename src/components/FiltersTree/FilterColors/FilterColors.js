import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ThemeProvider} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { setChosenColor, getAllColors } from '../../../redux/actions/colors';
import theme from './FilterColorsTheme';
import useStyles from './FilterColorsStyles';

const FilterColors = (props) => {
  const {setChosenColor, allColors, getAllColors} = props;
  const [state, setState] = useState({});
  const classes = useStyles();

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
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
    setChosenColor(event.target.name);
  }, [setChosenColor, state]);

  const createCheckboxes = useCallback((namesArray) => {
    return namesArray.map(color => {
      return <FormControlLabel
        className={classes.label}
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
  }, [classes.label, handleChange]);

  return (
    <ThemeProvider theme={theme}>
      {allColors && allColors.length && createCheckboxes(allColors)}
    </ThemeProvider>
  );
};

FilterColors.propTypes = {
  setChosenColor: PropTypes.func.isRequired,
  allColors: PropTypes.array.isRequired
};

const mapStateToProps = store => {
  return {
    allColors: store.allColors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChosenColor: color => dispatch(setChosenColor(color)),
    getAllColors: () => dispatch(getAllColors())
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(FilterColors));