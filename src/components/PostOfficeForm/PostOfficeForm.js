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
import useStyles from '../../styles/formStyle/formStyle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import theme from '../../styles/formStyle/formStyleTheme';
import globalConfig from '../../globalConfig';

const {regions} = globalConfig;

const NovaPoshtaCity = (props) => {
  const {submitNovaPoshtaHandler} = props;

  const options = Object.values(regions);
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
            onSubmit={submitNovaPoshtaHandler}>
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
                  id='open-on-focus'
                  name='city'
                  onChange={(event, newValue) => {
                    console.log('newvalue', newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  options={options}
                  style={{ width: '100%' }}
                  renderInput={(params) =>
                    <TextField {...params}
                      autoComplete='false'
                      name='city'
                      className={styles.input}
                      value=""
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={(errors.city && touched.city) && errors.city}
                      error={touched.city && Boolean(errors.city)}
                      label='Choose the city to deliver'
                      variant='outlined'
                      size='small'
                    />}
                />
                <TextField
                  name='npOffice'
                  autoComplete='on'
                  className={styles.input}
                  type='npOffice'
                  label='choose nova poshta post office №'
                  value={values.npOffice}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={(errors.npOffice && touched.npOffice) && errors.npOffice}
                  error={errors.npOffice && touched.npOffice}
                  variant='outlined'
                  size='small'
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
