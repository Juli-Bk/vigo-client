import React, {useCallback} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import theme from '../../styles/formStyle/formStyleTheme';
import {ThemeProvider} from '@material-ui/styles';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Button, CardActions, TextField, Typography} from '@material-ui/core';
import IconLabel from '../IconLabel/IconLabel';
import {Formik} from 'formik';
import useStyles from '../../styles/formStyle/formStyle';
import * as Yup from 'yup';
import {sendRecoverPasswordLetter} from '../../redux/actions/user';
import {setRestorePswdModalOpen} from '../../redux/actions/actions';
import EmailIcon from '@material-ui/icons/Email';

const ModalRestorePassword = (props) => {
  const styles = useStyles();
  const {open, setOpen, history, sendRecoverLetter} = props;

  const handleClose = useCallback(() => {
    setOpen(false);
    history.push('/');
  }, [history, setOpen]);

  const sendEmail = useCallback((values, {resetForm, setSubmitting}) => {
    const email = values.email;

    sendRecoverLetter(email, (result) => {
      if (result && result.status !== 400) {
        resetForm();
      }

      setSubmitting(false);
      setOpen(false);
      history.push('/');
    });
  }, [history, sendRecoverLetter, setOpen]);

  const validateObject = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required')
  });

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={styles.modalWindow}>
          <Typography className={styles.text} variant='caption' gutterBottom>
            To restore your password we need your email address
          </Typography>
          <Formik
            initialValues={{email: ''}}
            validationSchema={validateObject}
            onSubmit={sendEmail}>
            {({
              values,
              handleChange,
              handleSubmit, handleBlur,
              isSubmitting, errors,
              touched
            }) => (
              <form autoComplete='off'>
                <TextField
                  name='email'
                  autoComplete='on'
                  className={styles.input}
                  type='email'
                  label={<IconLabel label='Enter your e-mail' Component={EmailIcon}/>}
                  error={errors.email && touched.email}
                  fullWidth variant='outlined'
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={(errors.email && touched.email) && errors.email}
                  size='small'/>
                <CardActions>
                  <Button
                    type='button'
                    className={styles.button}
                    onClick={handleClose}
                    size='large'
                    variant='outlined'>
                    cancel
                  </Button>
                  <Button
                    type='submit'
                    className={styles.button}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    size='large'
                    variant='outlined'>
                    Send restore email
                  </Button>
                </CardActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

const mapStoreToProps = store => {
  return {
    open: store.modals && store.modals.isRestorePswdModalOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpen: isOpen => dispatch(setRestorePswdModalOpen(isOpen)),
    sendRecoverLetter: (email, callback) => dispatch(sendRecoverPasswordLetter(email, callback))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(withRouter(ModalRestorePassword)));