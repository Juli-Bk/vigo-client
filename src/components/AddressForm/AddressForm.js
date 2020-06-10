import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  TextField,
  Button,
  CardActions,
  Grid,
  ThemeProvider
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './AddressFormStyle';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import Checkbox from '../Checkbox/Checkbox.js';
import theme from './AddressFormTheme';
import ApartmentIcon from '@material-ui/icons/Apartment';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import IconLabel from '../IconLabel/IconLabel';
import PinDropIcon from '@material-ui/icons/PinDrop';
import AutocompleteComponent from '../Autocomplete/Autocomplete';

const AddressForm = (props) => {
  const {submitAddressHandler} = props;
  const submitAddressData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);
    submitAddressHandler(values, () => {
      setSubmitting(false);
      resetForm();
    });
  };

  const initFormValues = {
    autocomplete: '',
    buildingNumber: '',
    appartNumber: '',
    postCode: '',
    confirmation: true,
    saveMyData: true
  };

  const validateObject = Yup.object().shape({
    autocomplete: Yup.string()
      .required('Choose your delivery address here!'),
    buildingNumber: Yup.string()
      .min(1, 'Correct building number is a must!')
      .required('Required'),
    appartNumber: Yup.number()
      .required('Required'),
    confirmation: Yup.boolean()
      .oneOf([true], 'Must Accept Privacy Policy'),
    ValidateCheckBoxSchema: Yup.object().shape({
      subscribe: Yup.bool(),
      confirmation: Yup.bool()
    })
  });

  const styles = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Typography className={styles.header} variant='h4' gutterBottom>your delivery address</Typography>
        <Formik
          initialValues={initFormValues}
          validationSchema={validateObject}
          onSubmit={submitAddressData}>
          {({
            classes,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            values,
            errors,
            touched,
            onChange,
            confirmPassword
          }) => (
            <form autoComplete='on'>
              <ThemeProvider theme={theme}>
                <AutocompleteComponent name='autocomplete' onBlur={handleBlur} touched={touched} error={errors}/>
                <TextField
                  name='buildingNumber'
                  autoComplete='on'
                  label={<IconLabel label='Enter building number' Component={ApartmentIcon}/>}
                  className={styles.input}
                  value={values.buildingNumber}
                  onBlur={handleBlur}
                  onChange={handleChange('buildingNumber')}
                  helperText={touched.buildingNumber ? errors.buildingNumber : ''}
                  error={touched.buildingNumber && Boolean(errors.buildingNumber)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  name='appartNumber'
                  autoComplete='on'
                  label={<IconLabel label='Enter appartment number' Component={MyLocationIcon}/>}
                  className={styles.input}
                  onBlur={handleBlur}
                  value={values.appartNumber}
                  onChange={handleChange('appartNumber')}
                  helperText={touched.appartNumber ? errors.appartNumber : ''}
                  error={touched.appartNumber && Boolean(errors.appartNumber)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  name='postCode'
                  autoComplete='on'
                  label={<IconLabel label='Enter postal code' Component={PinDropIcon}/>}
                  className={styles.input}
                  value={values.postCode}
                  onBlur={handleBlur}
                  onChange={handleChange('postCode')}
                  helperText={touched.postCode ? errors.postCode : ''}
                  error={touched.postCode && Boolean(errors.postCode)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <FormGroup name='saveMyData' column='true'>
                  <Checkbox className='checkbox' name='confirmation' label='I have read and agree to the Privacy Policy' />
                </FormGroup>
              </ThemeProvider>
              <CardActions>
                <Button
                  type='submit'
                  className={styles.button}
                  onClick={handleSubmit}
                  size='large'
                  disabled={isSubmitting}
                  variant='outlined'>Continue
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </Grid>
      <Grid item xs={12} sm={6}>
      </Grid>
    </Grid>
  );
};

AddressForm.propTypes = {
  submitAddressHandler: PropTypes.func.isRequired
};

export default React.memo(AddressForm);