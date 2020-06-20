import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  RadioGroup,
  Button,
  CardActions,
  FormControl,
  FormHelperText,
  CardContent,
  FormControlLabel,
  Radio,
  Card, ThemeProvider
} from '@material-ui/core';
import useStyles from '../../styles/formStyle/formStyle';
import theme from '../../styles/formStyle/formStyleTheme';
import PropTypes from 'prop-types';

const NewCustomerForm = (props) => {
  const {submitNewCustomerHandler} = props;

  const submitNewCustomerData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    submitNewCustomerHandler(values, () => {
      setSubmitting(false);
      resetForm();
    });
  };

  const initFormValues = {
    radioGroup: ''
  };
  const validateObject = Yup.object({
    radioGroup: Yup.string().required('Please, choose one of these options')
  });

  const styles = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <Formik
            initialValues={initFormValues}
            validationSchema={validateObject}
            onSubmit={submitNewCustomerData}>
            {({ handleChange, values, handleSubmit, isSubmitting, errors}) => (
              <Form autoComplete='off' id='newCustomerForm'>
                <FormControl>
                  <Typography variant='subtitle2' className={styles.text}>How do you want to continue?</Typography>
                  <RadioGroup id='radioGroup' aria-label='newCustomer' value={values.radioGroup} name='formNew' onChange={handleChange}>
                    <FormControlLabel value='asGuest' name='radioGroup' id='radioOption1' color='default' control={<Radio />} label='Checkout as a guest' />
                    <FormControlLabel value='iWillRegister' name='radioGroup' id='radioOption2' color='default' control={<Radio />} label='Login/Register' />
                  </RadioGroup>
                  <FormHelperText>{errors.radioGroup}</FormHelperText>
                  <Typography className={styles.text} variant='subtitle1' gutterBottom>By creating an account with our store,
                you will be able to move through the checkout process faster, store multiple shipping addresses, view
                and track your orders in your account and more.</Typography>
                  <CardActions>
                    <Button
                      type='submit'
                      className={styles.button}
                      size='large'
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      variant='outlined'>Continue
                    </Button>
                  </CardActions>
                </FormControl>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
NewCustomerForm.propTypes = {
  submitNewCustomerHandler: PropTypes.func.isRequired
};

export default React.memo(NewCustomerForm);