import React from 'react';
import {Formik} from 'formik';
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
import PropTypes from 'prop-types';
import useStyles from '../../styles/formStyle/formStyle';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import theme from '../../styles/formStyle/formStyleTheme';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import IconLabel from '../IconLabel/IconLabel';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import AjaxUtils from '../../ajax';
import {validateObject} from './helper';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import PrivacyPolicyModal from '../VigoPrivacyPolicy/PrivacyPolicyModal';

const PersonalDetailsGuestForm = (props) => {
  const {saveGuestDataHandler, guestData} = props;
  const classes = useStyles();

  const handleCancel = () => {
    saveGuestDataHandler(null);
  };

  const initFormValues = {
    firstName: guestData ? guestData.firstName : '',
    lastName: guestData ? guestData.lastName : '',
    phoneNumber: guestData ? guestData.phoneNumber : '',
    email: guestData ? guestData.email : '',
    confirmation: false,
    subscribe: guestData ? guestData.subscribe : false,
    saveMyData: guestData ? guestData.saveMyData : true
  };

  const saveGuestData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);
    if (values.subscribe === true) {
      AjaxUtils.Subscribers.subscribe(values.email)
        .then(() => {
          resetForm();
          setSubmitting(false);
          saveGuestDataHandler(values);
        });
    } else {
      resetForm();
      setSubmitting(false);
      saveGuestDataHandler(values);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.header} variant='h6' gutterBottom>your personal details</Typography>
        <Formik
          validateOnChange={true}
          validateOnBlur={true}
          validateOnMount={true}
          initialValues={initFormValues}
          validationSchema={Yup.object().shape(validateObject)}
          onSubmit={saveGuestData}>
          {({
            isSubmitting, handleChange, handleBlur,
            handleSubmit, values, errors, touched
          }) => (
            <form autoComplete='on'>
              <ThemeProvider theme={theme}>
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
                  label={<IconLabel label='Enter your e-mail *' Component={EmailIcon}/>}
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
                  label={<IconLabel label='Enter your phone number *' Component={PhoneAndroidIcon}/>}
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
                    control={<Checkbox checked={values.subscribe || false}
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
                    label='I have read and agree on the Privacy Policy'
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

PersonalDetailsGuestForm.propTypes = {
  saveGuestDataHandler: PropTypes.func
};

const mapStateToProps = store => {
  return {
    guestData: store.guestData
  };
};

export default React.memo(connect(mapStateToProps)(PersonalDetailsGuestForm));