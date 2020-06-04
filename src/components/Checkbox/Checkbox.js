import React, { useState } from 'react';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import theme from './CheckboxTheme';

const CheckboxCustom = withStyles({
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const CheckboxLabels = (props) => {
  const {label, name} = props;
  const [state, setState] = useState({
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
        control={<CheckboxCustom checked={state.checked} onChange={handleChange} name={name} />}
        label={label}
      />
    </ThemeProvider>
  );
};

export default React.memo(CheckboxLabels);