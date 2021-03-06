import React from 'react';
import {connect} from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {ThemeProvider} from '@material-ui/core/styles';
import {
  Box,
  Button,
  TextField,
  CardActions,
  Grid,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './CardFormStyle';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import IconLabel from '../IconLabel/IconLabel';
import theme from './CardFormTheme';
import globalConfig from '../../globalConfig';
import {createUser} from '../../redux/actions/user';

const CardForm = (props) => {
  const {submitCardHandler, createUser} = props;
  const submitCardData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);
    submitCardHandler(values, () => {
      setSubmitting(false);
      resetForm();
    });
    const json = JSON.stringify({
      name: values.name,
      surname: values.surname
    });
    createUser(json, result => {
      setSubmitting(false);
      resetForm();
      submitCardHandler(result);
    });
  };

  const initFormValues = {
    creditCardNumber: '',
    Name: '',
    expirationDate: '',
    cvv: '',
    formData: null,
    saveMyData: true
  };

  const validateObject = Yup.object().shape({
    creditCardNumber: Yup.string()
      .min(16)
      .max(16, 'Must be 16 digits')
      .required(),
    name: Yup.string()
      .label('Name on card')
      .min(4, 'Enter the correct one')
      .required(),
    expirationDate: Yup.string()
      .typeError('Not a valid expiration date. Example: MM/YY')
      .max(5, 'Not a valid expiration date. Example: MM/YY')
      .matches(
        /([0-9]{2})\/([0-9]{2})/,
        'Not a valid expiration date. Example: MM/YY'
      )
      .required('Expiration date is required'),
    cvv: Yup.string()
      .min(3)
      .max(4)
      .required()
  });

  const styles = useStyles();

  function detectCardType (creditCardNumber) {
    const {types} = globalConfig;
    const cardTypes = Object.values(types);

    for (const key in cardTypes) {
      if (cardTypes[key].test(creditCardNumber)) {
        return key;
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <Formik
            initialValues={initFormValues}
            validationSchema={validateObject}
            onSubmit={submitCardData}>
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
                <Box>{detectCardType(values.creditCardNumber)}</Box>
                <TextField
                  name='creditCardNumber'
                  autoComplete='on'
                  label={<IconLabel label='Enter Card number' Component={CreditCardIcon}/>}
                  className={styles.input}
                  onBlur={handleBlur}
                  value={values.creditCardNumber}
                  onChange={handleChange('creditCardNumber')}
                  helperText={touched.creditCardNumber ? errors.creditCardNumber : ''}
                  error={touched.creditCardNumber && Boolean(errors.creditCardNumber)}
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  name='name'
                  autoComplete='on'
                  className={styles.input}
                  value={values.name}
                  onBlur={handleBlur}
                  label='Name on card'
                  onChange={handleChange('name')}
                  helperText={touched.name ? errors.name : ''}
                  error={touched.name && Boolean(errors.name)}
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  name='expirationDate'
                  autoComplete='off'
                  className={styles.inputSmall}
                  label='__ / __'
                  value={values.expirationDate}
                  onBlur={handleBlur}
                  onChange={handleChange('expirationDate')}
                  helperText={touched.expirationDate ? errors.expirationDate : ''}
                  error={touched.expirationDate && Boolean(errors.expirationDate)}
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  name='cvv'
                  autoComplete='on'
                  className={styles.inputSmall}
                  value={values.cvv}
                  label='cvv'
                  onBlur={handleBlur}
                  onChange={handleChange('cvv')}
                  helperText={touched.cvv ? errors.cvv : ''}
                  error={touched.cvv && Boolean(errors.cvv)}
                  variant='outlined'
                />
                <FormControlLabel control={<Checkbox name='saveMyData' className={styles.checkbox} color='default' />} label="Remember me" />
                <CardActions>
                  <Button
                    type='submit'
                    className={styles.button}
                    onClick={handleSubmit}
                    fullWidth
                    disabled={isSubmitting}
                    variant='outlined'>Confirm
                  </Button>
                </CardActions>
              </form>
            )}
          </Formik>
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

CardForm.propTypes = {
  submitCardHandler: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: (data, callback) => dispatch(createUser(data, callback))
  };
};

export default React.memo(connect(null, mapDispatchToProps)(CardForm));