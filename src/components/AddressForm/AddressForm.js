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
import ApartmentIcon from '@material-ui/icons/Apartment';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import IconLabel from '../IconLabel/IconLabel';
import PinDropIcon from '@material-ui/icons/PinDrop';
import AutocompleteComponent from '../Autocomplete/Autocomplete';
import {connect} from 'react-redux';
import {validateObject} from './helper';
import { saveUserData, setUserDeliveryAddress } from '../../redux/actions/user';
import PrivacyPolicyModal from '../VigoPrivacyPolicy/PrivacyPolicyModal';

const AddressForm = (props) => {
  const {submitAddressHandler, user, saveUserData, setUserDeliveryAddress} = props;
  const {addresses = []} = user;

  const handleCancel = () => {
    submitAddressHandler(null);
  };

  const submitAddressData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);
    setUserDeliveryAddress('');

    const newAddressesList = {
      id: user._id,
      addresses: [
        ...addresses,
        {
          address: values.autocomplete,
          house: values.house,
          apartment: values.apartment,
          postalCode: values.postalCode
        }
      ]
    };

    saveUserData(newAddressesList, (result) => {
      setSubmitting(false);
      if (result && result.status !== 400) {
        resetForm();
      }
      submitAddressHandler(result);
    });
  };

  const initFormValues = {
    autocomplete: '',
    house: '',
    apartment: '',
    postalCode: '',
    confirmation: false
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.header} variant='h4' gutterBottom>
            your delivery address
          </Typography>
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
              touched,
              setFieldValue
            }) => (
              <form>
                <AutocompleteComponent
                  autoComplete='on'
                  className={classes.input}
                  name='autocomplete'
                  onBlur={handleBlur}
                  touched={touched}
                  value={values.autocomplete}
                  onChange={handleChange}
                  error={errors}
                  setFieldValue={setFieldValue}
                  fullWidth
                />
                <TextField
                  autoComplete='off'
                  name='house'
                  label={<IconLabel label='Enter building number *' Component={ApartmentIcon}/>}
                  className={classes.input}
                  value={values.house || ''}
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
                  className={classes.input}
                  onBlur={handleBlur}
                  value={values.apartment || ''}
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
                  label={<IconLabel label='Enter postal code *' Component={PinDropIcon}/>}
                  className={classes.input}
                  value={values.postalCode || ''}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.postalCode ? errors.postalCode : ''}
                  error={touched.postalCode && Boolean(errors.postalCode)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <Typography className={classes.xsmall}>* - Required field</Typography>
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
                <PrivacyPolicyModal/>
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
                    size='large'
                    disabled={isSubmitting}
                    variant='outlined'>save
                  </Button>
                </CardActions>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

AddressForm.propTypes = {
  submitAddressHandler: PropTypes.func.isRequired,
  setUserDeliveryAddress: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  saveUserData: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserData: (data, callback) => dispatch(saveUserData(data, callback)),
    setUserDeliveryAddress: data => dispatch(setUserDeliveryAddress(data))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(AddressForm));
