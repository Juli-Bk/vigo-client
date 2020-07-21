import React, {useCallback} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Card, CardActions, CardContent, TextField, ThemeProvider, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import theme from '../../styles/formStyle/formStyleTheme';
import IconLabel from '../IconLabel/IconLabel';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EnhancedEncryptionRoundedIcon from '@material-ui/icons/EnhancedEncryptionRounded';
import useStyles from '../../styles/formStyle/formStyle';
import EmailIcon from '@material-ui/icons/Email';
import {registerUser} from '../../redux/actions/user';
import {connect} from 'react-redux';

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
    .required('No password provided')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
  registered: Yup.boolean()
});

const RegisterForm = (props) => {
  const {submitRegisterHandler, registerUser} = props;

  const handleCancel = useCallback(() => {
    submitRegisterHandler(null);
  }, [submitRegisterHandler]);

  const submitRegisterData = useCallback((values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    const json = JSON.stringify({
      email: values.email,
      login: values.login,
      password: values.password
    });

    registerUser(json, (result) => {
      if (result && result.status !== 400) {
        resetForm();
      }
      setSubmitting(false);
      submitRegisterHandler(result);
    });
  }, [registerUser, submitRegisterHandler]);

  const styles = useStyles();

  return (
    <Card id="register-form">
      <CardContent>
        <Typography className={styles.text} variant='caption' gutterBottom>
          Register with us for future convenience:
        </Typography>
        <Formik
          initialValues={initFormValues}
          validationSchema={validateObject}
          onSubmit={submitRegisterData}>
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
            isSubmitting
          }) => (
            <form autoComplete='off'>
              <ThemeProvider theme={theme}>
                <TextField
                  name='login'
                  autoComplete='on'
                  className={styles.input}
                  type='text'
                  label={<IconLabel label='Enter your login *' Component={PersonIcon}/>}
                  error={errors.login && touched.login}
                  fullWidth variant='outlined'
                  value={values.login}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={(errors.login && touched.login) && errors.login}
                  size='small'
                />
                <TextField
                  name='email'
                  autoComplete='on'
                  className={styles.input}
                  type='email'
                  label={<IconLabel label='Enter your email *' Component={EmailIcon}/>}
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={(errors.email && touched.email) && errors.email}
                  error={errors.email && touched.email}
                  size='small'
                  fullWidth
                  variant='outlined'
                />
                <TextField
                  name='password'
                  autoComplete='off'
                  className={styles.input}
                  label={<IconLabel label='Enter your password *'
                    Component={LockIcon}/>}
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth variant='outlined'
                  helperText={touched.password ? errors.password : ''}
                  error={touched.password && Boolean(errors.password)}
                  size='small'
                />
                <TextField
                  name='confirmPassword'
                  className={styles.input}
                  autoComplete='off'
                  label={<IconLabel label='Confirm your password *'
                    Component={EnhancedEncryptionRoundedIcon}/>}
                  type='password'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </ThemeProvider>
              <Typography className={styles.xsmall}>* - Required field</Typography>
              <CardActions>
                <Button
                  type='button'
                  className={styles.button}
                  onClick={handleCancel}
                  size='large'
                  variant='outlined'>
                  cancel
                </Button>
                <Button
                  type='submit'
                  className={styles.button}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size='large'
                  variant='outlined'>
                  Register
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

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (userData, callback) => dispatch(registerUser(userData, callback))
  };
};

export default React.memo(connect(null, mapDispatchToProps)(RegisterForm));