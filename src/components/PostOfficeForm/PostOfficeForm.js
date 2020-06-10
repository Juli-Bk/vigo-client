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
  const [value, setValue] = useState(regions[0]);
  const submitNovaPoshtaData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);
    submitNovaPoshtaHandler(values, () => {
      setSubmitting(false);
      resetForm();
    });
  };
  const defaultProps = {
    options: Object.values(regions),
    getOptionLabel: option => option
  };
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

  const styles = useStyles();

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
              touched,
              onChange
            }) => (
              <form>
                <Autocomplete
                  {...defaultProps}
                  value={value}
                  id='open-on-focus'
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) =>
                    <TextField {...params}
                      name='city'
                      className={styles.input}
                      onBlur={handleBlur}
                      label='Choose the city to delivery'
                      // value={values.city}
                      // onChange={handleChange('city')}
                      helperText={(errors.city && touched.city) && errors.city}
                      error={touched.city && Boolean(errors.city)}
                      variant='outlined'
                    />}
                />
                <TextField
                  name='npOffice'
                  autoComplete='on'
                  className={styles.input}
                  value={values.npOffice}
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
                    // disabled={isSubmitting}
                    variant='outlined'>Confirm
                  </Button>
                </CardActions>
              </form>
            )}
          </Formik>
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

NovaPoshtaCity.propTypes = {
  submitNovaPoshtaHandler: PropTypes.func.isRequired
};

export default React.memo(NovaPoshtaCity);