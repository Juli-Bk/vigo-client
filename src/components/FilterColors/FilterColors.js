import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AjaxUtils from '../../ajax';
import { setChosenColor } from '../../redux/actions/actions';

const FilterColors = (props) => {
  const {setChosenColor} = props;
  const [state, setState] = useState({});
  const [checkBoxes, setCheckBoxes] = useState([]);

  const colorsKit = new Set();

  useEffect(() => {
    AjaxUtils.Colors.getAllColors()
      .then(result => {
        result.colors.forEach(color => {
          colorsKit.add(color.baseColorName);
        });
        setCheckBoxes(Array.from(colorsKit).map(color => {
          return <FormControlLabel key={color} label={color} control={<Checkbox onChange={handleChange} name={color}/>}/>;
        }));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorsKit]);

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
    setChosenColor(event.target.name);
  };

  return (
    <Box>
      <h2>color filter</h2>
      {checkBoxes.length && checkBoxes}
    </Box>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setChosenColor: color => dispatch(setChosenColor(color))
  };
};

export default React.memo(connect(null, mapDispatchToProps)(FilterColors));