import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import globalConfig from '../../globalConfig';
import {ThemeProvider} from '@material-ui/styles';
import theme from './PaymentFormTheme';
import VigoAddress from '../../components/DefineDelivery/VigoAddress';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles/formStyle/formStyle';

const {paymentOptions} = globalConfig;

function Payment (inputValue, styles) {
  switch (inputValue) {
    case paymentOptions.BY_CASH:
      return <VigoAddress/>;
    case paymentOptions.LIQ_PAY:
      return (
        <ThemeProvider theme={theme}>
          <Typography variant='subtitle2' className={styles.text}>
            You can pay on next step
          </Typography>
        </ThemeProvider>
      );
    default:
      return <Typography variant='subtitle2' className={styles.text}>
        Please, select payment option
      </Typography>;
  }
}

const PaymentForm = () => {
  const styles = useStyles();
  const options = Object.values(paymentOptions);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            name='autopayment'
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              // todo сохранять в редакс данные о выбранном типе оплаты
            }}
            id='controllable-states-demo'
            options={options}
            style={{width: '100%'}}
            renderInput={(params) =>
              <TextField {...params}
                name='payment'
                label='Payment options'
                variant='outlined'/>}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {Payment(value, styles)}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default React.memo(PaymentForm);