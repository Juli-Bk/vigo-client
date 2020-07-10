import React, { useCallback, useState } from 'react';
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
import {setNewPassModalOpenState} from '../../redux/actions/actions';
import EnhancedEncryptionRoundedIcon from '@material-ui/icons/EnhancedEncryptionRounded';
import LockIcon from '@material-ui/core/SvgIcon/SvgIcon';

const ModalChangePassword = (props) => {
  const styles = useStyles();
  const {saveNewPassword, open, setOpen} = props;
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const buttonText = 'Change my password';

  const saveNewPass = useCallback((values, {resetForm, setSubmitting}) => {
    const password = values.password;

    saveNewPassword(password, (result) => {
      if (result && result.status !== 400) {
        resetForm();
      }
      saveNewPassword(result);
      console.log(saveNewPassword);
      setSubmitting(false);
      setOpen(false);
    });
  }, [saveNewPassword, setOpen]);

  const validateObject = Yup.object({
    password: Yup.string()
      .required('No password provided')
      .min(8, 'Password is too short - should be 8 chars minimum')
      .required('Required'),
    newPassword: Yup.string()
      .required('Enter new password')
      .min(8, 'Password is too short - should be 8 chars minimum'),
    confirmPassword: Yup.string()
      .required('Confirm your new password')
      .oneOf([Yup.ref('newPassword')], 'Password does not match')
  });

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <ThemeProvider theme={theme}>
      <Button className={styles.button} onClick={handleOpen}>
        {buttonText}
      </Button>
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
              Create a new strong password that you don't use for other websites
          </Typography>
          <Formik
            initialValues={{ password: '' }}
            validationSchema={validateObject}
            onSubmit={saveNewPass}>
            {({
              values,
              handleChange,
              handleSubmit, handleBlur,
              isSubmitting, errors,
              touched
            }) => (
              <form autoComplete='off'>
                <TextField
                  name='password'
                  autoComplete='off'
                  className={styles.input}
                  type='password'
                  label={<IconLabel label='Enter your password'
                    Component={LockIcon}/>}
                  error={errors.password && touched.password}
                  fullWidth variant='outlined'
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={(errors.password && touched.password) && errors.password}
                  size='small'/>
                <TextField
                  name='newPassword'
                  className={styles.input}
                  autoComplete='off'
                  label={<IconLabel label='Create new password'
                    Component={EnhancedEncryptionRoundedIcon}/>}
                  type='password'
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.newPassword ? errors.newPassword : ''}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  variant='outlined'
                  size='small'
                />
                <TextField
                  name='confirmPassword'
                  className={styles.input}
                  autoComplete='off'
                  label={<IconLabel label='Confirm your password'
                    Component={EnhancedEncryptionRoundedIcon}/>}
                  type='password'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  variant='outlined'
                  size='small'
                />
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
                      Change my password
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
    open: store.isNewPswdModalOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpen: isOpen => dispatch(setNewPassModalOpenState(isOpen))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(withRouter(ModalChangePassword)));