import React, { useCallback } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setSnackMessage} from '../../redux/actions/actions';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const SnackbarMessage = (props) => {
  const {setSnack, snackMessage} = props;

  const handleClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack(false, '');
  }, [setSnack]);

  return (
    <>
      <Snackbar
        id='snack'
        open={snackMessage.isOpen}
        autoHideDuration={4000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackMessage.severity}>
          {snackMessage.message}
        </Alert>
      </Snackbar>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setSnack: (isOpen, message) => dispatch(setSnackMessage(isOpen, message))
  };
};

const mapStoreToProps = store => {
  return {
    snackMessage: store.snackMessage
  };
};
Snackbar.propTypes = {
  message: PropTypes.string,
  setSnack: PropTypes.func,
  snackMessage: PropTypes.object
};

export default React.memo(connect(mapStoreToProps, mapDispatchToProps)(SnackbarMessage));