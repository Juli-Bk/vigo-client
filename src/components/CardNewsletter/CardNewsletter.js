import React, { useRef, useCallback, useState } from 'react';
import {Button, Card, CardActions, CardContent, TextField, Typography} from '@material-ui/core';
import theme from './CardNewsletterTheme';
import useStyles from './CardNewsletterStyle';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {ThemeProvider} from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import IconLabel from '../IconLabel/IconLabel';
import { setPopoverOpenState } from '../../redux/actions/actions';
import PopoverMessage from '../PopoverMessage/PopoverMessage';
import { connect } from 'react-redux';
import globalConfig from '../../globalConfig';

const CardNewsletter = (props) => {
  const {saveEmail, setPopoverOpen} = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const styles = useStyles();
  const anchorRef = useRef();

  const handleSubmit = useCallback((values, {resetForm, setSubmitting}) => {
    setSubmitting(true);
    setAnchorEl(anchorRef.current);

    saveEmail(values.email)
      .then(() => {
        setPopoverOpen(true);
        setSubmitting(false);
        resetForm();
      });
  }, [saveEmail, setPopoverOpen]);

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
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
            isSubmitting
          }) => (
            <form id='subscribe-form' className={styles.form} autoComplete='off'>
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
                  ref={anchorRef}
                />
              </ThemeProvider>
              <CardActions>
                <Button
                  type='submit'
                  id='subscribe'
                  className={styles.signUpButton}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  size='large'
                  variant='outlined'>
                  Subscribe
                </Button>
                <PopoverMessage
                  popoverContent={globalConfig.userMessages.SUBSCRIBED}
                  anchorEl={anchorEl}/>
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

const mapStateToProps = store => {
  return {
    isPopoverOpen: store.stateFlags.isPopoverOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPopoverOpen: flag => dispatch(setPopoverOpenState(flag))
  };
};
export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CardNewsletter));