import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {connect} from 'react-redux';
import {setSnackMessageState} from '../../redux/actions/actions';

const SnackbarMessage = (props) => {
  const {message} = props;
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  function Alert (props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }
  return (
    <>
      <Button onClick={handleClick}>
        for trial
      </Button>
      <Snackbar
        id='snack'
        open={open}
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

export default connect(null, mapDispatchToProps)(SnackbarMessage);