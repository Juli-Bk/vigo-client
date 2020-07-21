import React, { useCallback} from 'react';
import theme from '../../styles/formStyle/formStyleTheme';
import {ThemeProvider} from '@material-ui/styles';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { Button, CardActions, Grid, TextField, Typography } from '@material-ui/core';
import IconLabel from '../IconLabel/IconLabel';
import {Formik} from 'formik';
import useStyles from '../../styles/formStyle/formStyle';
import * as Yup from 'yup';
import EnhancedEncryptionRoundedIcon from '@material-ui/icons/EnhancedEncryptionRounded';
import LockIcon from '@material-ui/icons/Lock';
import { saveNewPassword } from '../../redux/actions/user';

const ChangePasswordForm = (props) => {
  const styles = useStyles();
  const {saveNewPassword, user} = props;

  const handleCancel = () => {
    saveNewPassHandler(null);
  };

  const saveNewPassHandler = useCallback((values, {resetForm, setSubmitting}) => {
    setSubmitting(true);

    const data = {
      oldPassword: values.password,
      newPassword: values.newPassword
    };

    saveNewPassword(user._id, data);
    resetForm();
    setSubmitting(false);
  }, [saveNewPassword, user._id]);

  const validateObject = Yup.object({
    password: Yup.string()
      .required('No password provided')
      .min(8, 'Password is too short - should be 8 chars minimum')
      .required('Required'),
    newPassword: Yup.string()
      .required('Enter new password')
      .min(8, 'Password is too short - should be 8 chars minimum'),
    confirmPassword: Yup.string()
      .required('Confirm new password')
      .oneOf([Yup.ref('newPassword')], 'Password does not match')
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={styles.header} variant='h6' gutterBottom>Change password</Typography>
          <Formik
            initialValues={{
              password: '',
              newPassword: '',
              confirmPassword: ''
            }}
            validationSchema={validateObject}
            onSubmit={saveNewPassHandler}>
            {({
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
              errors,
              touched
            }) => (
              <form autoComplete='off'>
                <TextField
                  name='password'
                  autoComplete='off'
                  className={styles.input}
                  type='password'
                  label={<IconLabel label='Enter your password *'
                    Component={LockIcon}/>}
                  error={errors.password && touched.password}
                  fullWidth
                  variant='outlined'
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={(errors.password && touched.password) && errors.password}
                  size='small'/>
                <TextField
                  name='newPassword'
                  className={styles.input}
                  autoComplete='off'
                  label={<IconLabel label='Create new password *'
                    Component={EnhancedEncryptionRoundedIcon}/>}
                  type='password'
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.newPassword ? errors.newPassword : ''}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  variant='outlined'
                  fullWidth
                  size='small'
                />
                <TextField
                  name='confirmPassword'
                  className={styles.input}
                  autoComplete='off'
                  label={<IconLabel label='Confirm your password *'
                    Component={EnhancedEncryptionRoundedIcon}/>}
                  type='password'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  variant='outlined'
                  fullWidth
                  size='small'
                />
                <Typography className={styles.xsmall}>* - Required field</Typography>
                <CardActions>
                  <Button
                    type='button'
                    className={styles.button}
                    onClick={handleCancel}
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
                    Save
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

ChangePasswordForm.defaultProps = {
  saveNewPassHandler: () => {}
};

const mapStoreToProps = store => {
  return {
    open: store.isNewPswdModalOpen,
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveNewPassword: (userId, data) => dispatch(saveNewPassword(userId, data))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(withRouter(ChangePasswordForm)));