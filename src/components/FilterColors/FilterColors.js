import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AjaxUtils from '../../ajax';
import { setChosenColor } from '../../redux/actions/actions';
import theme from './FilterColorsTheme';
import useStyles from './FilterColorsStyles';

const FilterColors = (props) => {
  const {setChosenColor, colorsInStorage, colorNames} = props;
  const [state, setState] = useState({});
  const [allColors, setAllColors] = useState([]);
  const [uniqColorNames, setUniqColorNames] = useState([]);
  const classes = useStyles(colorNames);

  const createCheckboxes = (namesArray) => {
    return namesArray.map(colorName => {
      return <FormControlLabel className={classes.label} key={colorName} label={colorName} control={<Checkbox className={classes[colorName]} onChange={handleChange} name={colorName} color='default'/>}/>;
    });
  };

  useEffect(() => {
    AjaxUtils.Colors.getAllColors()
      .then(result => {
        setAllColors(result.colors);

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

    const chosenColorsData = allColors.filter(color => color.baseColorName === event.target.name);

    chosenColorsData.forEach(color => {
      setChosenColor(color.id);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {uniqColorNames.length && createCheckboxes(uniqColorNames)}
    </ThemeProvider>
  );
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