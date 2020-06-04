import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Typography, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useStyles from './ContactFormStyle';
import IconLabel from '../IconLabel/IconLabel';
import PersonIcon from '@material-ui/icons/Person';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';
import theme from './ContactFormTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import Recaptcha from 'react-recaptcha';

const ContactForm = (props) => {
  const {submitHandler} = props;

  const styles = useStyles();

  const submitData = (values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    const json = JSON.stringify({
      name: values.name,
      email: values.email,
      topic: values.topic,
      message: values.message,
      recaptcha: values.recaptcha
    });

    submitHandler(json)
      .then(result => {
        setSubmitting(false);
        resetForm();
      });
  };

  const initFormValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
    recaptcha: ''
  };

  const validationSample = Yup.object({
    name: Yup.string()
      .required('Please, enter your name')
      .min(1, 'Name too short'),
    email: Yup.string()
      .email('Incorrect email')
      .required('Please, enter valid email'),
    recaptcha: Yup.string()
      .required('Recaptcha required')
  });

  // const handleSubscribe = () => {

  // };

  return (
    <Grid className={styles.form} item container xs={12} md={8}>
      <Typography className={styles.heading} variant='h2'>LEAVE A COMMENT</Typography>
      <Grid item xs={12}>
        <Formik
          initialValues={initFormValues}
          validationSchema={validationSample}
          onSubmit={submitData}>
          {({values, handleChange, handleSubmit, handleBlur, isSubmitting, errors, touched, setFieldValue}) => (
            <ThemeProvider theme={theme}>
              <form autoComplete='off'>
                <Grid container spacing={2}>
                  <Grid item container justify="space-between" xs={12} lg={6}>
                    <Grid item xs={12} md={6} lg={12}>
                      <TextField
                        name='name'
                        className={styles.input}
                        type='text'
                        label={<IconLabel label='ENTER YOUR NAME' Component={PersonIcon}/>}
                        variant="outlined"
                        error={errors.name && touched.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        helperText={(errors.name && touched.name) && errors.name}
                      />

                      <TextField
                        name='email'
                        type='email'
                        className={styles.input}
                        variant="outlined"
                        label={<IconLabel label='ENTER YOUR E-MAIL' Component={MailIcon}/>}
                        error={errors.email && touched.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        helperText={(errors.email && touched.email) && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} md={5} lg={12}>
                      <TextField
                        name='topic'
                        type='text'
                        className={styles.input}
                        variant="outlined"
                        autoComplete="off"
                        label={<IconLabel label='ENTER YOUR SUBJECT' Component={InsertDriveFileIcon}/>}
                      />

                      <Typography variant='subtitle2' className={styles.infoMsg}>
                        Your email address will not be published.
                        Required fields are marked
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      name='message'
                      type='text'
                      multiline
                      rowsMax={8}
                      rows={8}
                      className={styles.textArea}
                      variant='outlined'
                      autoComplete='off'
                      label={<IconLabel label='ENTER YOUR MESSAGE' Component={CreateIcon}/>}
                    />
                    {errors.recaptcha &&
                  touched.recaptcha && (
                      <Typography className={styles.captchaErr} variant='subtitle2'>{errors.recaptcha}</Typography>
                    )}
                    <Recaptcha
                      className={styles.captcha}
                      sitekey="6LdBUAAVAAAAAJU2FSLbOf7w9rDJiOOR1bLhhzWF"
                      verifyCallback={(response) => { setFieldValue('recaptcha', response); }}
                    />
                    <Button
                      type='submit'
                      variant='outlined'
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >SEND MESSAGE
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </ThemeProvider>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

ContactForm.propTypes = {
  submitHandler: PropTypes.func
};

export default ContactForm;
