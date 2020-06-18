import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ThemeProvider} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AjaxUtils from '../../../ajax';
import { setChosenColor } from '../../../redux/actions/actions';
import theme from './FilterColorsTheme';
import useStyles from './FilterColorsStyles';

const FilterColors = (props) => {
  const {setChosenColor, colorsInStorage} = props;
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

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      AjaxUtils.Colors.getAllColors()
        .then(result => {
          const colorsSet = new Map();
          result.colors.forEach(color => {
            colorsSet.set(color.baseColorName, {
              name: color.baseColorName,
              hex: color.hex
            });
          });
  
          const colors = Array.from(colorsSet).map(item => item[1]);
          setUniqColorNames(colors);
        });
    }
    return () => {
      isCanceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, colorsInStorage, setChosenColor]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
    setChosenColor(event.target.name);
  };

  return (
    <ThemeProvider theme={theme}>
      {uniqColorNames.length && createCheckboxes(uniqColorNames)}
    </ThemeProvider>
  );
};

FilterColors.propTypes = {
  colorsInStorage: PropTypes.array,
  setChosenColor: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    colorsInStorage: store.colors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChosenColor: color => dispatch(setChosenColor(color))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(FilterColors));