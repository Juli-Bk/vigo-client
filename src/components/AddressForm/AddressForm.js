import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  TextField,
  Button,
  CardActions,
  Grid,
  ThemeProvider,
  FormControlLabel,
  FormHelperText,
  Checkbox
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './AddressFormStyle';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
// import Checkbox from '../Checkbox/Checkbox.js';
import theme from './AddressFormTheme';
import ApartmentIcon from '@material-ui/icons/Apartment';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import IconLabel from '../IconLabel/IconLabel';
import PinDropIcon from '@material-ui/icons/PinDrop';
import AutocompleteComponent from '../Autocomplete/Autocomplete';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/actions';
import AjaxUtils from '../../ajax';

const AddressForm = (props) => {
  const {user, setUser, submitAddressHandler} = props;

  const [address, setAddress] = useState('');
  const submitAddressData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    const data = JSON.stringify({
      addresses: {
        address: address,
        house: values.buildingNumber,
        apartment: values.apartNumber,
        postalCode: values.postCode
      }
    });

    // AjaxUtils.Users.updateUserInfoById(user._id, data)
    //   .then(result => {
    //     if (result) {
    //       setUser(result);
    //     }
    //   });

    console.log('saved address', data);

    submitAddressHandler(values, () => {
      setSubmitting(false);
      resetForm();
    });
  };

  const initFormValues = {
    autocomplete: '',
    buildingNumber: '',
    apartNumber: '',
    postCode: '',
    confirmation: false
  };

  const validateObject = Yup.object().shape({
    autocomplete: Yup.string(),
    // .required('Required'),
    buildingNumber: Yup.string()
      .min(1, 'Correct building number is a must!')
      .required('Required'),
    apartNumber: Yup.number()
      .required('Required'),
    confirmation: Yup.boolean()
      .oneOf([true], 'Must Accept Privacy Policy')
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
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            values,
            errors,
            touched,
            onChange
          }) => (
            <form autoComplete='on'>
              <ThemeProvider theme={theme}>

                <AutocompleteComponent
                  setAddress={setAddress}
                  name='autocomplete'
                  onBlur={handleBlur}
                  touched={touched}
                  value={values.autocomplete}
                  onChange={handleChange('autocomplete')}
                  error={errors}/>

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
                  name='apartNumber'
                  autoComplete='on'
                  label={<IconLabel label='Enter apartment number' Component={MyLocationIcon}/>}
                  className={styles.input}
                  onBlur={handleBlur}
                  value={values.apartNumber}
                  onChange={handleChange('apartNumber')}
                  helperText={touched.apartNumber ? errors.apartNumber : ''}
                  error={touched.apartNumber && Boolean(errors.apartNumber)}
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
                <FormGroup
                  name='saveMyData'>
                  <FormControlLabel
                    control={<Checkbox
                      className='checkbox'
                      checked={values.confirmation}
                      onChange={handleChange}
                      name='confirmation'
                      color='default'/>}
                    label='I have read and agree to the Privacy Policy'
                  />
                  {touched.confirmation && errors.confirmation &&
                  <FormHelperText
                    error={touched.confirmation && !!errors.confirmation}>
                    {errors.confirmation}
                  </FormHelperText>}
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
const mapDispatchToProps = dispatch => {
  return {
    setUser: data => dispatch(setUser(data))
  };
};
export default React.memo(connect(null, mapDispatchToProps)(AddressForm));