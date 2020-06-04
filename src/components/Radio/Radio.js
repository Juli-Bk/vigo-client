import React, { useState } from 'react';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import theme from '../NewCustomerForm/CheckoutLabels/CheckboxLabelsTheme';

const RadioCustom = withStyles({
  checked: {}
})((props) => <Radio color='default' {...props} />);

const RadioButtons = (props) => {
  const {value} = props;
  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <RadioCustom
          checked={selectedValue}
          onChange={handleChange}
          value={value}
          color='default'
          name='radio-button-demo'
          inputProps={{ 'aria-label': 'a' }}
        />
      </ThemeProvider>
    </div>
  );
};
export default React.memo(RadioButtons);