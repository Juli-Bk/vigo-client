import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from '../../containers/Header/headerStyle';
import theme from '../../components/ModalLogin/ModalLoginTheme';
import { ThemeProvider } from '@material-ui/styles';
import RegisterForm from '../RegisterForm/RegisterForm';

const ModalSignUp = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Button className={classes.signUpLogo} variant='outlined' color='primary' onClick={handleClickOpen}>
          Sign up
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Do you want to SIGN UP?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <RegisterForm/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='default' autoFocus>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
export default React.memo(ModalSignUp);