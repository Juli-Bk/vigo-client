import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  TextField,
  Button,
  CardActions,
  Container,
  ThemeProvider
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './PersonalDetailsFormStyle';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import Checkbox from '../Checkbox/Checkbox.js';
import theme from './PersonalDetailsTheme';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import IconLabel from '../IconLabel/IconLabel';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EnhancedEncryptionRoundedIcon from '@material-ui/icons/EnhancedEncryptionRounded';
import EmailIcon from '@material-ui/icons/Email';

const PersonalDetailsForm = (props) => {
  const {submitPersonalDetailsHandler} = props;
  const submitPersonalDetailsData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);
    submitPersonalDetailsHandler(values, () => {
      setSubmitting(false);
      resetForm();
    }); console.log('info', values);
  };

  const initFormValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    confirmation: true,
    subscribe: true,
    checkboxGroup: '',
    saveMyData: true
  };

  const validateObject = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Too short!')
      .max(30, 'Too long!')
      .required('Required. Write your Name please'),
    lastName: Yup.string()
      .min(3, 'Too short!')
      .max(30, 'Too long!')
      .required('Required.  Write your Last Name please'),
    phone: Yup.string()
      .matches(('^\\+?3?8?(0\\d{9})$'), 'use form +38(097)1112233')
      .required('Required'),
    email: Yup.string()
      .email()
      .required('Required'),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .required('Required'),
    confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Password does not match'),
    confirmation: Yup.boolean()
      .oneOf([true], 'Must Accept Privacy Policy'),
    subscribe: Yup.boolean(),
    checkboxGroup: Yup.array().required('At least one checkbox is required'),
    ValidateCheckBoxSchema: Yup.object().shape({
      subscribe: Yup.bool(),
      confirmation: Yup.bool()
    })
      .test('myCustomCheckboxTest', null, (obj) => {
        if (obj.subscribe || obj.confirmation) {
          return true;
        } else {
          return new Yup.ValidationError(
            'Must agree to something',
            null
          );
        }
      })
  });

  const styles = useStyles();

  return (
    <Container>
      <Typography className={styles.header} variant='h4' gutterBottom>your personal details</Typography>
      <Formik
        initialValues={initFormValues}
        validationSchema={validateObject}
        onSubmit={submitPersonalDetailsData}>
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
          <form autoComplete='off'>
            <ThemeProvider theme={theme}>
              <TextField
                name='firstName'
                label={<IconLabel label='Enter your Name' Component={PersonIcon}/>}
                className={styles.input}
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.firstName ? errors.firstName : ''}
                error={touched.firstName && Boolean(errors.firstName)}
                variant='outlined'
                fullWidth
              />
              <TextField
                name='lastName'
                label={<IconLabel label='Enter your Surname' Component={PersonIcon}/>}
                className={styles.input}
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.lastName ? errors.lastName : ''}
                error={touched.lastName && Boolean(errors.lastName)}
                variant='outlined'
                fullWidth
              />
              <TextField
                name='email'
                label={<IconLabel label='Enter your e-mail' Component={EmailIcon}/>}
                className={styles.input}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email ? errors.email : ''}
                error={touched.email && Boolean(errors.email)}
                variant='outlined'
                fullWidth
              />
              <TextField
                name='phone'
                label={<IconLabel label='Enter your phone number' Component={PhoneAndroidIcon}/>}
                className={styles.input}
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.phone ? errors.phone : ''}
                error={touched.phone && Boolean(errors.phone)}
                variant='outlined'
                fullWidth
              />
              <TextField
                name='password'
                autoComplete='off'
                className={styles.input}
                label={<IconLabel label='Enter your password' Component={LockIcon}/>}
                type='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth variant='outlined'
                helperText={touched.password ? errors.password : ''}
                error={touched.password && Boolean(errors.password)}
              />
              <TextField
                name='confirmPassword'
                className={styles.input}
                autoComplete='off'
                label={<IconLabel label='Confirm your password' Component={EnhancedEncryptionRoundedIcon}/>}
                type='password'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                variant='outlined'
                fullWidth
              />
              <FormGroup name='saveMyData' column='true'>
                <Checkbox name='subscribe' label='I wish to subscribe to the Vigo Shop newsletter' />
                <Checkbox name='confirmation' label='I have read and agree to the Privacy Policy' />
              </FormGroup>
            </ThemeProvider>
            <CardActions>
              <Button
                type='submit'
                className={styles.button}
                onClick={handleSubmit}
                disabled={isSubmitting}
                size='large'
                variant='outlined'>Continue
              </Button>
            </CardActions>
          </form>
        )}
      </Formik>
    </Container>
  );
};

PersonalDetailsForm.propTypes = {
  submitPersonalDetailsHandler: PropTypes.func.isRequired
};

export default React.memo(PersonalDetailsForm);