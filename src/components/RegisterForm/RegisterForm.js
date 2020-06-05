import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, CardActions, CardContent, TextField, ThemeProvider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import theme from './RegisterFormTheme';
import IconLabel from '../IconLabel/IconLabel';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EnhancedEncryptionRoundedIcon from '@material-ui/icons/EnhancedEncryptionRounded';
import useStyles from './RegisterFormStyle';
import EmailIcon from '@material-ui/icons/Email';

// import Checkbox from '../Checkbox/Checkbox.js';

const RegisterForm = (props) => {
  const {submitRegisterHandler} = props;
  const submitRegisterData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    const json = JSON.stringify({
      email: values.email,
      login: values.login,
      password: values.password
    });

    submitRegisterHandler(json)
      .then(result => {
        alert(JSON.stringify(result));
        setSubmitting(false);
        resetForm();
      });
  };

  const initFormValues = {
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
    registered: true
  };

  const validateObject = Yup.object({
    login: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .required('Required'),
    confirmPassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Password does not match'),
    registered: Yup.boolean()
  });

  const styles = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography className={styles.header} variant='h4' gutterBottom>new customer</Typography>
        <Typography className={styles.text} variant='subtitle1' gutterBottom>Register with us for future
          convenience:</Typography>
        <Formik
          initialValues={initFormValues}
          validationSchema={validateObject}
          onSubmit={submitRegisterData}>
          {({values, handleChange, handleSubmit, handleBlur, errors, touched, onChange, isSubmitting, confirmPassword}) => (
            <form autoComplete='off'>
              <ThemeProvider theme={theme}>
                <TextField
                  name='login'
                  autoComplete='on'
                  className={styles.input}
                  type='text'
                  label={<IconLabel label='Enter your login' Component={PersonIcon}/>}
                  error={errors.login && touched.login}
                  fullWidth variant='outlined'
                  value={values.login}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={(errors.login && touched.login) && errors.login}/>
                <TextField
                  name='email'
                  autoComplete='on'
                  className={styles.input}
                  type='email'
                  label={<IconLabel label='Enter your email' Component={EmailIcon}/>}
                  error={errors.email && touched.email}
                  fullWidth variant='outlined'
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={(errors.email && touched.email) && errors.email}/>
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
              </ThemeProvider>
              {/* todo save user password in browser */}
              {/* <Checkbox label='Remember password' color='default' name='registered'/> */}
              <CardActions>
                <Button
                  type='submit'
                  className={styles.button}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size='large'
                  variant='outlined'>Sign up
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

RegisterForm.propTypes = {
  submitRegisterHandler: PropTypes.func.isRequired
};

export default React.memo(RegisterForm);