import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  TextField,
  Button,
  CardActions,
  Box,
  ThemeProvider,
  FormControlLabel,
  FormHelperText,
  Checkbox
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './AddressFormStyle';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
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
  const {submitAddressHandler, user} = props;

  const [address, setAddress] = useState('');
  const submitAddressData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    const addresses = {
      addresses: [{
        address: address,
        house: values.house,
        apartment: values.apartment,
        postalCode: values.postalCode
      }]
    };

    AjaxUtils.Users.updateUserInfoById(user._id, addresses)
      .then(result => {
        setSubmitting(false);
        if (result.status !== 400) {
          resetForm();
        }
        // submitAddressHandler(values, () => {
        //   setSubmitting(false);
        //   resetForm();
        // });
      });
    console.log('saved address', addresses);

    submitAddressHandler(values, () => {
      setSubmitting(false);
      resetForm();
    });
  };

  const initFormValues = {
    // autocomplete: '',
    house: '',
    apartment: '',
    postalCode: '',
    confirmation: false
  };

  const validateObject = Yup.object().shape({
    // autocomplete: Yup.object()
    //   .required('Required'),
    house: Yup.string()
      .min(1, 'Correct building number is a must!')
      .required('Required'),
    apartment: Yup.number()
      .required('Required'),
    confirmation: Yup.boolean()
      .oneOf([true], 'Must Accept Privacy Policy')
  });

  const styles = useStyles();

  return (
    <Box>
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
          values,
          errors,
          touched
        }) => (
          <form autoComplete='on'>
            <ThemeProvider theme={theme}>
              <AutocompleteComponent
                autoComplete='on'
                name='address'
                className={styles.input}
                setAddress={setAddress}
                // name='autocomplete'
                onBlur={handleBlur}
                touched={touched}
                value={values.autocomplete}
                onChange={handleChange}
                error={errors}
                fullWidth
              />
              <TextField
                autoComplete='on'
                name='house'
                label={<IconLabel label='Enter building number' Component={ApartmentIcon}/>}
                className={styles.input}
                value={values.house}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={touched.house ? errors.house : ''}
                error={touched.house && Boolean(errors.house)}
                variant='outlined'
                size='small'
                fullWidth
              />
              <TextField
                name='apartment'
                label={<IconLabel label='Enter apartment number' Component={MyLocationIcon}/>}
                className={styles.input}
                onBlur={handleBlur}
                value={values.apartment}
                onChange={handleChange}
                helperText={touched.apartment ? errors.apartment : ''}
                error={touched.apartment && Boolean(errors.apartment)}
                variant='outlined'
                size='small'
                fullWidth
              />
              <TextField
                name='postalCode'
                autoComplete='on'
                label={<IconLabel label='Enter postal code' Component={PinDropIcon}/>}
                className={styles.input}
                value={values.postalCode}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={touched.postalCode ? errors.postalCode : ''}
                error={touched.postalCode && Boolean(errors.postalCode)}
                variant='outlined'
                size='small'
                fullWidth
              />
              <FormGroup>
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
    </Box>
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