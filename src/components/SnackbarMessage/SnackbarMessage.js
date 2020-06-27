import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setSnackMessageState} from '../../redux/actions/actions';

const Alert = (props) => {
  return React.memo(<MuiAlert elevation={6} variant='filled' {...props} />);
};

const SnackbarMessage = (props) => {
  const {message, setSnack, isSnackMessageOpen} = props;

  const handleClick = useCallback(() => {
    setSnack(true);
  }, [setSnack]);

  const handleClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack(false);
  }, [setSnack]);

  return (
    <>
      <Button onClick={handleClick}>
        for trial
      </Button>
      <Snackbar
        id='snack'
        open={isSnackMessageOpen}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='success'>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setSnack: flag => dispatch(setSnackMessageState(flag))
  };
};

const mapStoreToProps = store => {
  return {
    isSnackMessageOpen: store.isSnackMessageOpen
  };
};
Snackbar.propTypes = {
  message: PropTypes.string,
  setSnack: PropTypes.function,
  isSnackMessageOpen: PropTypes.function
};

export default React.memo(connect(mapStoreToProps, mapDispatchToProps)(SnackbarMessage));