import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  TextField,
  Button,
  CardActions,
  Grid,
  ThemeProvider, FormHelperText, Checkbox, FormControlLabel
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './PersonalDetailsFormStyle';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import theme from './PersonalDetailsTheme';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import IconLabel from '../IconLabel/IconLabel';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import AjaxUtils from '../../ajax';
import { setUser } from '../../redux/actions/actions';

const PersonalDetailsForm = (props) => {
  const {user, setUser, submitPersDetailsHandler} = props;
  const {firstName, lastName, email, phoneNumber} = user;

  const handleCancel = () => {
    submitPersDetailsHandler({});
  };

  const submitPersonalDetailsData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    if (user) {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email
      };

      AjaxUtils.Users.updateUserInfoById(user._id, data)
        .then(result => {
          setSubmitting(false);
          if (result.status !== 400) {
            resetForm();
          } else {
            submitPersDetailsHandler(result);
            setUser(result);
          }
        })
        .catch(error => {
          console.log(error);
          setSubmitting(false);
          submitPersDetailsHandler(values, error);
        });
    } else {
      submitPersDetailsHandler(values);
    }

    if (values.subscribe === true) {
      AjaxUtils.Subscribers.subscribe(values.email);
    }
  };

  const initFormValues = {
    firstName: user ? firstName : '',
    lastName: user ? lastName : '',
    phoneNumber: user ? phoneNumber : '',
    email: user ? email : '',
    confirmation: false,
    subscribe: false,
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
    phoneNumber: Yup.string()
    // todo replace regExp to config and use it in all places where it`s needed
      .matches(('^\\+?3?8?(0\\d{9})$'), 'use form +38(097)1112233')
      .required('Required'),
    email: Yup.string()
      .email()
      .required('Required'),
    subscribe: Yup.bool(),
    confirmation: Yup.bool()
      .oneOf([true], 'You must agree to The Privacy Policy')
  });

  const styles = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={styles.header} variant='h6' gutterBottom>your personal details</Typography>
        <Formik
          initialValues={initFormValues}
          validationSchema={validateObject}
          onSubmit={submitPersonalDetailsData}>
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
                <TextField
                  autoComplete='on'
                  name='firstName'
                  label={<IconLabel label='Enter your Name' Component={PersonIcon}/>}
                  className={styles.input}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.firstName ? errors.firstName : ''}
                  error={touched.firstName && Boolean(errors.firstName)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  autoComplete='on'
                  name='lastName'
                  label={<IconLabel label='Enter your Surname' Component={PersonIcon}/>}
                  className={styles.input}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.lastName ? errors.lastName : ''}
                  error={touched.lastName && Boolean(errors.lastName)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  autoComplete='on'
                  name='email'
                  label={<IconLabel label='Enter your e-mail' Component={EmailIcon}/>}
                  className={styles.input}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && Boolean(errors.email)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  autoComplete='on'
                  name='phoneNumber'
                  label={<IconLabel label='Enter your phone number' Component={PhoneAndroidIcon}/>}
                  className={styles.input}
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.phoneNumber ? errors.phoneNumber : ''}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <FormGroup
                  name='saveMyData'
                  column='true'>
                  <FormControlLabel
                    control={<Checkbox checked={values.subscribe}
                      onChange={handleChange}
                      name='subscribe'
                      color='default'/>}
                    label='I wish to subscribe to the Vigo Shop newsletter'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={values.confirmation}
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
                  type='button'
                  className={styles.button}
                  onClick={handleCancel}
                  size='large'
                  variant='outlined'>cancel
                </Button>
                <Button
                  type='submit'
                  className={styles.button}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size='large'
                  variant='outlined'>Save
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

PersonalDetailsForm.propTypes = {
  submitPersDetailsHandler: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: data => dispatch(setUser(data))
  };
};

export default React.memo(connect(null, mapDispatchToProps)(PersonalDetailsForm));