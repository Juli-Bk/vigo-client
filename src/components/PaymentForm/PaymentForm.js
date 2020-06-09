import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../components/RegisterForm/RegisterFormStyle';

const options = ['By Cash', 'Pryvat24', 'Credit Card', 'Google Pay'];

const PaymentForm = () => {
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  const styles = useStyles;
  return (
    <Container>
      <Typography variant='h6' gutterBottom>
        Payment options
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={6} >
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id='controllable-states-demo'
            options={options}
            style={{ width: '100%' }}
            renderInput={(params) =>
              <TextField {...params}
                name='delivery'
                className={styles.input}
                label='Payment options'
                variant='outlined' />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        </Grid>
      </Grid>
    </Container>
  );
};
export default React.memo(PaymentForm);