import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, TextField, Typography} from '@material-ui/core';
import theme from './CardNewsletterTheme';
import useStyles from './CardNewsletterStyle';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {ThemeProvider} from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import Popover from '@material-ui/core/Popover';
import IconLabel from '../IconLabel/IconLabel';
// import PopoverMessage from '../PopoverMessage/PopoverMessage';

// const popoverContent = 'You are subscribed!';
// const buttonContent = 'Subscribe';
const CardNewsletter = (props) => {
  const {saveEmail} = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleSubmit = (values, {resetForm, setSubmitting}, event) => {
    setSubmitting(true);
    setAnchorEl(event.currentTarget);

    saveEmail(values.email)
      .then(result => {
        { /* <PopoverMessage */ }
        { /*  popoverContent={popoverContent} */ }
        { /*  buttonContent={buttonContent} />; */ }
        // todo show to user some nice popup or something
        alert(JSON.stringify(result));
        // todo set flag for buttons setSubmitting(false/true) in all forms to block button when submiting performs
        handleClose();
        setSubmitting(false);
        resetForm();
      });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
        <Typography className={styles.text} variant='body2' component='p'>
          subscribe to get exclusive offers from your
          favorite brands.</Typography>
        <Formik
          initialValues={initFormValues}
          validationSchema={validateObject}
          validateOnBlur={true}
          onSubmit={handleSubmit}>
          {({values, handleChange, handleSubmit, handleBlur, errors, touched, handleClose, isSubmitting }) => (
            <form id="subscribe-form" className={styles.form} autoComplete='off'>
              <ThemeProvider theme={theme}>
                <TextField
                  name='email'
                  className={styles.email}
                  label={<IconLabel label='Enter your e-mail' Component={EmailIcon}/>}
                  variant='outlined'
                  error={errors.email && touched.email}
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={(errors.email && touched.email) && errors.email}
                  size='small'
                />
              </ThemeProvider>
              <CardActions>
                <Button
                  aria-describedby={id}
                  type='submit'
                  className={styles.signUpButton}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  size='large'
                  variant='outlined'>subscribe
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                >
                  <Typography className={styles.typography}>You are subscribed now!</Typography>
                </Popover>
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
