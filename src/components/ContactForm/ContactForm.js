import React, {useCallback} from 'react';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import {Formik} from 'formik';
import * as Yup from 'yup';
import useStyles from './ContactFormStyle';
import IconLabel from '../IconLabel/IconLabel';
import PersonIcon from '@material-ui/icons/Person';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';
import theme from './ContactFormTheme';
import {ThemeProvider} from '@material-ui/core/styles';
import Recaptcha from 'react-recaptcha';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {sendEmail} from '../../redux/actions/email';

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
  message: Yup.string()
    .required('Please, enter your message to us')
    .min(1, 'Write us more, you are welcome'),
  email: Yup.string()
    .email('Incorrect email')
    .required('Please, enter valid email'),
  recaptcha: Yup.string()
    .required('Recaptcha required')
});

const ContactForm = (props) => {
  const {sendEmail} = props;
  const styles = useStyles();

  const submitData = useCallback((values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    if (!values.recaptcha) {
      return;
    }

    const data = {
      subject: `From: ${values.name}: ${values.subject}`,
      text: values.message,
      to: 'vigo.shop.official@gmail.com',
      from: values.email
    };

    sendEmail(data, result => {
      if (result && result.status !== 400) {
        resetForm();
      }
      setSubmitting(false);
    });
  }, [sendEmail]);

  return (
    <Grid className={styles.form} item container xs={12} sm={8}>
      <Typography className={styles.heading} variant='h2'>LEAVE A COMMENT</Typography>
      <Grid item xs={12}>
        <Formik
          initialValues={initFormValues}
          validationSchema={validationSample}
          onSubmit={submitData}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
            errors,
            touched,
            setFieldValue
          }) => (
            <ThemeProvider theme={theme}>
              <form autoComplete='off'>
                <Grid container spacing={2}>
                  <Grid item container justify='space-between' xs={12} lg={6} className={styles.leftColumn}>
                    <Grid item xs={12} md={6} lg={12}>
                      <TextField
                        name='name'
                        value={values.name}
                        className={styles.input}
                        type='text'
                        label={<IconLabel label='ENTER YOUR NAME *' Component={PersonIcon}/>}
                        variant='outlined'
                        error={errors.name && touched.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        size='small'
                        helperText={(errors.name && touched.name) && errors.name}
                      />
                      <TextField
                        name='email'
                        type='email'
                        value={values.email}
                        className={styles.input}
                        variant='outlined'
                        autoComplete='on'
                        label={<IconLabel label='ENTER YOUR E-MAIL *' Component={MailIcon}/>}
                        error={errors.email && touched.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        size='small'
                        helperText={(errors.email && touched.email) && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} md={5} lg={12}>
                      <TextField
                        name='subject'
                        type='text'
                        value={values.subject}
                        className={styles.input}
                        variant='outlined'
                        autoComplete='off'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        size='small'
                        label={<IconLabel label='ENTER YOUR SUBJECT' Component={InsertDriveFileIcon}/>}
                      />
                      <Typography variant='subtitle2' className={styles.infoMsg}>
                        Your email address will not be published.
                      </Typography>
                      <Typography className={styles.xsmall}>* - Required field</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      name='message'
                      value={values.message}
                      type='text'
                      multiline
                      rowsMax={8}
                      rows={8}
                      className={styles.textArea}
                      variant='outlined'
                      autoComplete='off'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label={<IconLabel label='ENTER YOUR MESSAGE' Component={CreateIcon}/>}
                    />
                    {errors.recaptcha &&
                    touched.recaptcha && (
                      <Typography className={styles.captchaErr} variant='subtitle2'>{errors.recaptcha}</Typography>)}
                    <Recaptcha
                      className={styles.captcha}
                      sitekey='6LdBUAAVAAAAAJU2FSLbOf7w9rDJiOOR1bLhhzWF'
                      verifyCallback={(response) => {
                        setFieldValue('recaptcha', response);
                      }}
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

const mapDispatchToProps = dispatch => {
  return {
    sendEmail: (data, callback) => dispatch(sendEmail(data, callback))
  };
};

export default connect(null, mapDispatchToProps)(React.memo(withRouter(ContactForm)));
