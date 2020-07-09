import React, {useCallback} from 'react';
import theme from '../../styles/formStyle/formStyleTheme';
import {ThemeProvider} from '@material-ui/styles';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Box, Button, CardActions, Grid, TextField, Typography} from '@material-ui/core';
import IconLabel from '../IconLabel/IconLabel';
import LockIcon from '@material-ui/icons/Lock';
import {Formik} from 'formik';
import useStyles from '../../styles/formStyle/formStyle';
import * as Yup from 'yup';
import queryString from 'query-string';
import {saveRecoverPassword} from '../../redux/actions/user';

const RestorePswrdForm = (props) => {
  const styles = useStyles();
  const {history, location, savePswd} = props;

  const saveNewPassword = useCallback((values, {resetForm, setSubmitting}) => {
    const parsed = queryString.parse(location.search);
    const email = parsed.email;
    const token = parsed.token;

    savePswd({
      newPassword: values.password,
      email
    }, token, (result) => {
      if (result && result.status !== 400) {
        resetForm();
        setSubmitting(false);
        history.push('/');
      } else {
        setSubmitting(false);
      }
    });
  }, [history, location.search, savePswd]);

  const handleCancel = useCallback(() => {
    history.push('/');
  }, [history]);

  const initFormValues = {
    password: ''
  };
  const validateObject = Yup.object({
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars min')
      .required('Required')
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} justify="center">
        <Box style={{
          maxWidth: 400,
          minHeight: 200,
          padding: 20
        }}>
          <Typography className={styles.text} variant='caption' gutterBottom>
         Here you can enter your new password
          </Typography>
          <Formik
            initialValues={initFormValues}
            validationSchema={validateObject}
            onSubmit={saveNewPassword}>
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
                  label={<IconLabel label='Enter your password' Component={LockIcon}/>}
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth variant='outlined'
                  helperText={touched.password ? errors.password : ''}
                  error={touched.password && Boolean(errors.password)}
                  size='small'
                />
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
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    savePswd: (formData, token, callback) => dispatch(saveRecoverPassword(formData, token, callback))
  };
};

export default connect(null, mapDispatchToProps)(React.memo(withRouter(RestorePswrdForm)));