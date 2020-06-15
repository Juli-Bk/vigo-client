import React from 'react';
import {Button, Card, CardActions, CardContent, TextField, Typography} from '@material-ui/core';
import theme from './CardNewsletterTheme';
import useStyles from './CardNewsletterStyle';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {ThemeProvider} from '@material-ui/core/styles';

const CardNewsletter = (props) => {
  const {saveEmail} = props;
  const handleSubmit = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    saveEmail(values.email)
      .then(result => {
        // todo show to user some nice popup or something
        alert(JSON.stringify(result));
        // todo set flag for buttons setSubmitting(false/true) in all forms to block button when submiting performs
        setSubmitting(false);
        resetForm();
      });
  };

  const initFormValues = {
    email: '',
    saveMyData: true
  };
  const validateObject = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    saveMyData: Yup.boolean()
  });

  const styles = useStyles();
  return (
    <Card className={styles.newsletter} variant='outlined'>
      <CardContent>
        <Typography className={styles.title} variant='h4'>newsletter</Typography>
        <Typography className={styles.text} variant='body2' component='p'>subscribe to get exclusive offers from your
          favorite brands.</Typography>
        <Formik
          initialValues={initFormValues}
          validationSchema={validateObject}
          validateOnBlur={true}
          onSubmit={handleSubmit}>
          {({values, handleChange, handleSubmit, handleBlur, errors, touched, isSubmitting }) => (
            <form id="subscribe-form" className={styles.form} autoComplete='off'>
              <ThemeProvider theme={theme}>
                <TextField
                  name='email'
                  className={styles.email}
                  label='Enter your e-mail address'
                  variant='outlined'
                  error={errors.email && touched.email}
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={(errors.email && touched.email) && errors.email}/>
              </ThemeProvider>
              <CardActions>
                <Button
                  type='submit'
                  className={styles.signUpButton}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  size='large'
                  variant='outlined'>subscribe
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>

  );
};

CardNewsletter.propTypes = {
  saveEmail: PropTypes.func.isRequired
};

export default React.memo(CardNewsletter);
