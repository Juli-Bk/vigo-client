import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ThemeProvider} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { setChosenColor } from '../../../redux/actions/colors';
import theme from './FilterColorsTheme';
import useStyles from './FilterColorsStyles';

const FilterColors = (props) => {
  const {setChosenColor, colors, allColors} = props;
  const [state, setState] = useState({});
  const [uniqColorNames, setUniqColorNames] = useState([]);
  const classes = useStyles();

  const createCheckboxes = (namesArray) => {
    return namesArray.map(color => {
      return <FormControlLabel
        className={classes.label}
        key={color.name + color.hex}
        label={color.name}
        control={
          <Checkbox
            onChange={handleChange}
            name={color.name}
            color="primary"
            style={{
              color: color.hex.toLowerCase() === '#ffffff' ? '#f9f9f9' : color.hex
            }}
          />
        }/>;
    });
  };
  // todo replace request by all colors to products page
  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      setUniqColorNames(allColors);
    }
    return () => {
      isCanceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, colors, setChosenColor, allColors]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
    setChosenColor(event.target.name);
  };

  return (
    <ThemeProvider theme={theme}>
      {allColors && allColors.length && createCheckboxes(uniqColorNames)}
    </ThemeProvider>
  );
};

FilterColors.propTypes = {
  colorsInStorage: PropTypes.array,
  setChosenColor: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    colors: store.colors,
    allColors: store.allColors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChosenColor: color => dispatch(setChosenColor(color))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(FilterColors));