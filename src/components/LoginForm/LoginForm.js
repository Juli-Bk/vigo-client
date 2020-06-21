import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Card, CardActions, CardContent, TextField, ThemeProvider, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from '../../styles/formStyle/formStyle';
import theme from '../../styles/formStyle/formStyleTheme';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import IconLabel from '../IconLabel/IconLabel';
import {getUserTokenAndData} from '../../redux/actions/user';
import {connect} from 'react-redux';

const LoginForm = (props) => {
  const {submitLoginHandler, getUser} = props;

  const handleCancel = () => {
    submitLoginHandler({});
  };

  const submitLoginData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);
    getUser(values.email, values.password, (result) => {
      if (result && result.status !== 400) {
        resetForm();
      }
      submitLoginHandler(result);
      setSubmitting(false);
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
    <ThemeProvider theme={theme}>
      <Card id="login-form">
        <CardContent>
          <Typography className={styles.text} variant='caption' gutterBottom>
          If you have an account, please log in
          </Typography>
          <Formik
            initialValues={initFormValues}
            validationSchema={validateObject}
            onSubmit={submitLoginData}>
            {({
              values,
              handleChange,
              handleSubmit, handleBlur,
              isSubmitting, errors,
              touched
            }) => (
              <form autoComplete='off'>

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
                  helperText={(errors.email && touched.email) && errors.email}
                  size='small'/>
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
                  size='small'
                />
                {/* todo save user data for quick login */}
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
                    login
                  </Button>
                </CardActions>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

LoginForm.propTypes = {
  submitLoginHandler: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: (email, password, callback) => dispatch(getUserTokenAndData(email, password, callback))
  };
};

export default React.memo(connect(null, mapDispatchToProps)(LoginForm));