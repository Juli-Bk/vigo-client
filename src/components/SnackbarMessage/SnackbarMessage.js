import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {connect} from 'react-redux';
import {setSnackMessageState} from '../../redux/actions/actions';

const snackMessage = 'You are subscribed now!';

const SnackbarMessage = () => {
  const [open, setOpen, setSnack] = useState(false);

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
        Subscribe
      </Button>
      <Snackbar
        id='snack'
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = store => {
  return {
    snack: store.snack
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSnack: data => dispatch(setSnackMessageState(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarMessage);