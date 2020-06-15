import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AjaxUtils from '../../ajax';
import { setChosenColor } from '../../redux/actions/actions';
import theme from './FilterColorsTheme';
import useStyles from './FilterColorsStyles';

const FilterColors = (props) => {
  const {setChosenColor, colorsInStorage} = props;
  const [state, setState] = useState({});
  const [uniqColorNames, setUniqColorNames] = useState([]);
  const classes = useStyles();

  const createCheckboxes = (namesArray) => {
    return namesArray.map(colorName => {
      return <FormControlLabel
        className={classes.label}
        key={colorName}
        label={colorName}
        control={<Checkbox
          className={classes[colorName]}
          onChange={handleChange}
          name={colorName}
          color='default'/>}/>;
    });
  };

  useEffect(() => {
    AjaxUtils.Colors.getAllColors()
      .then(result => {
        const colorsSet = new Set();

        result.colors.forEach(color => {
          colorsSet.add(color.baseColorName);
        });

        setUniqColorNames(Array.from(colorsSet));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, colorsInStorage, setChosenColor]);

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
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