import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Card, CardActions, CardContent, TextField, ThemeProvider, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './LoginFormStyle';
import theme from './LoginFormTheme';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import IconLabel from '../IconLabel/IconLabel';
import AjaxUtils from '../../ajax';

const LoginForm = (props) => {
  const {submitLoginHandler} = props;

  const submitLoginData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    const json = JSON.stringify({
      login: values.email,
      password: values.password
    });

    AjaxUtils.Users.login(json)
      .then(result => {
        setSubmitting(false);
        if (result.status !== 400) {
          resetForm();
        }
        submitLoginHandler(result);
      });
  };
  const initFormValues = {
    email: '',
    password: '',
    saveMyData: true
  };

  const validateObject = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .required('Required'),
    saveMyData: Yup.boolean()
  });

  const styles = useStyles();

  return (
    <Card>

      <CardContent>
        {/* <Typography className={styles.header} variant='h4' gutterBottom>registered customer</Typography> */}
        <Typography className={styles.text} variant='subtitle1' gutterBottom>If you have an account, please log
          in.</Typography>
        <Formik
          initialValues={initFormValues}
          validationSchema={validateObject}
          onSubmit={submitLoginData}>
          {({values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched, onChange}) => (
            <form autoComplete='off'>
              <ThemeProvider theme={theme}>
                <TextField
                  name='email'
                  autoComplete='off'
                  className={styles.input}
                  type='email'
                  label={<IconLabel label='Enter your e-mail' Component={EmailIcon}/>}
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
              </ThemeProvider>
              {/* todo save user data for quick login */}
              <CardActions>
                <Button
                  type='submit'
                  className={styles.button}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size='large'
                  variant='outlined'>login
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

LoginForm.propTypes = {
  submitLoginHandler: PropTypes.func.isRequired
};

export default React.memo(LoginForm);