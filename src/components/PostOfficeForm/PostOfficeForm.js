import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {ThemeProvider} from '@material-ui/core/styles';
import {
  Button,
  TextField,
  CardActions,
  Grid
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from '../CardForm/CardFormStyle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import theme from '../CardForm/CardFormTheme';
import globalConfig from '../../globalConfig';

const {regions} = globalConfig;

const NovaPoshtaCity = (props) => {
  const {submitNovaPoshtaHandler} = props;

  // todo get values from BD to render them in checkout
  const submitNovaPoshtaData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);
    console.log('novaposhta', values);
    submitNovaPoshtaHandler(values, () => {
      setSubmitting(false);
      resetForm();
    });
  };
  const options = Object.values(regions);
  // const [value, setValue] = useState(regions[0]);
  const [inputValue, setInputValue] = useState('');

  const styles = useStyles();

  const initFormValues = {
    city: '',
    npOffice: ''
  };

  const validateObject = Yup.object().shape({
    npOffice: Yup.number()
      .label('Nova Poshta Office Number')
      .required(),
    city: Yup.string()
      .label('Delivery City')
      .required()
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <Formik
            initialValues={initFormValues}
            validationSchema={validateObject}
            onSubmit={submitNovaPoshtaData}>
            {({
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <form>
                <Autocomplete
                  id='open-on-focus'
                  name='city'
                  // defaultValue={value}
                  // onChange={(event, newValue) => {
                  //   console.log('newvalue', newValue);
                  //   setValue(newValue);
                  // }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    console.log('newinput', newInputValue);
                    console.log('newinput', typeof newInputValue);
                    setInputValue(newInputValue);
                  }}
                  options={options}
                  style={{ width: '100%' }}
                  renderInput={(params) =>
                    <TextField {...params}
                      autoComplete='false'
                      // name='city'
                      className={styles.input}
                      value=""
                      onBlur={handleBlur}
                      helperText={(errors.city && touched.city) && errors.city}
                      error={touched.city && Boolean(errors.city)}
                      label='Choose the city to deliver'
                      variant='outlined' />}
                />
                <TextField
                  name='npOffice'
                  autoComplete='on'
                  className={styles.input}
                  defaultValue={values.npOffice}
                  onBlur={handleBlur}
                  label='choose nova poshta post office №'
                  onChange={handleChange('npOffice')}
                  helperText={touched.npOffice ? errors.npOffice : ''}
                  error={touched.npOffice && Boolean(errors.npOffice)}
                  variant='outlined'
                  fullWidth
                />
                <CardActions>
                  <Button
                    type='submit'
                    className={styles.button}
                    onClick={handleSubmit}
                    fullWidth
                    disabled={isSubmitting}
                    variant='outlined'>Confirm
                  </Button>
                </CardActions>
              </form>
            )}
          </Formik>
        </Grid>

      </Grid>
    </ThemeProvider>
  );
};
NovaPoshtaCity.propTypes = {
  submitNovaPoshtaHandler: PropTypes.func.isRequired
};

export default React.memo(NovaPoshtaCity);
