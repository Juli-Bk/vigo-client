import React from 'react';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  Button,
  CardActions,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  ThemeProvider,
  Typography
} from '@material-ui/core';
import useStyles from '../../styles/formStyle/formStyle';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import theme from '../../styles/formStyle/formStyleTheme';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import IconLabel from '../IconLabel/IconLabel';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import {saveUserData} from '../../redux/actions/user';
import {validateObject} from './helper';
import PrivacyPolicyModal from '../VigoPrivacyPolicy/PrivacyPolicyModal';
import { subscribe } from '../../redux/actions/subscribers';

const PersonalDetailsForm = (props) => {
  const {user, savePersonalUserData, saveUserAddressesHandler, subscribe} = props;
  const {firstName, lastName, email, phoneNumber, login} = user;

  const handleCancel = () => {
    saveUserAddressesHandler(null);
  };

  const submitPersonalDetailsData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    const data = {
      id: user._id,
      login: values.login,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email
    };

    savePersonalUserData(data, (result) => {
      setSubmitting(false);
      if (result && result.status === 200) {
        resetForm();
      }
      saveUserAddressesHandler(result);
    });

    if (values.subscribe === true) {
      subscribe(values.email);
    }
  };

  const initFormValues = {
    login: user ? login : '',
    firstName: user ? firstName : '',
    lastName: user ? lastName : '',
    phoneNumber: user ? phoneNumber : '',
    email: user ? email : '',
    confirmation: false,
    subscribe: false,
    saveMyData: true
  };

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.header} variant='h6' gutterBottom>your personal details</Typography>
        <Formik
          initialValues={initFormValues}
          validationSchema={Yup.object().shape(validateObject)}
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
                  name='login'
                  label={<IconLabel label='Enter your login' Component={AccountCircleIcon} />}
                  className={classes.input}
                  value={values.login || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.login ? errors.login : ''}
                  error={touched.login && Boolean(errors.login)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  autoComplete='on'
                  name='firstName'
                  label={<IconLabel label='Enter your Name *' Component={PersonIcon}/>}
                  className={classes.input}
                  value={values.firstName || ''}
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
                  label={<IconLabel label='Enter your Surname *' Component={PersonIcon}/>}
                  className={classes.input}
                  value={values.lastName || ''}
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
                  label={<IconLabel label='Enter your e-mail *' Component={EmailIcon} />}
                  className={classes.input}
                  value={values.email || ''}
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
                  label={<IconLabel label='Enter phone number *' Component={PhoneAndroidIcon}/>}
                  className={classes.input}
                  value={values.phoneNumber || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.phoneNumber ? errors.phoneNumber : ''}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <Typography className={classes.xsmall}>* - Required field</Typography>
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
                    control={<Checkbox checked={values.confirmation || false}
                      onChange={handleChange}
                      name='confirmation'
                      color='default'/>}
                    label='I have read and agree to the Privacy Policy'
                  />
                  <PrivacyPolicyModal/>
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
                  className={classes.button}
                  onClick={handleCancel}
                  size='large'
                  variant='outlined'>cancel
                </Button>
                <Button
                  type='submit'
                  className={classes.button}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size='large'
                  variant='outlined'>Continue
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

PersonalDetailsForm.defaultProps = {
  saveUserAddressesHandler: () => {}
};

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    savePersonalUserData: (data, callback) => dispatch(saveUserData(data, callback)),
    subscribe: email => dispatch(subscribe(email))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(PersonalDetailsForm));