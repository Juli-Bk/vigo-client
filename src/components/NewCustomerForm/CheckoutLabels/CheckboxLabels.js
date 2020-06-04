import React, {useState} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './CheckboxLabelsTheme';

const CheckboxLabels = ({labelText, name}) => {
  const [state, setState] = useState({
    checked: false
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'checkbox with default color' }}
            name={name}
            color='default'
          />
        }
        label={labelText}
      />
    </ThemeProvider>
  );
};
export default React.memo(CheckboxLabels);