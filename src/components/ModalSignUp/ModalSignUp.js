import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useStyles from '../../containers/Header/headerStyle';
import theme from '../../components/ModalLogin/ModalLoginTheme';
import { ThemeProvider } from '@material-ui/styles';
import RegisterForm from '../RegisterForm/RegisterForm';
import {Typography} from '@material-ui/core';

const ModalSignUp = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [isMessageHidden, setIsMessageHidden] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  // todo make message red color if login is not success
  const messageTag = <DialogContent>
    <Typography variant='subtitle1' gutterBottom style={{
      color: '#f0877c'
    }}>{message}</Typography>
  </DialogContent>;

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
        <DialogContent>
          <RegisterForm submitRegisterHandler={(result) => {
            if (result.status === 400) {
              setMessage(result.message);
              setIsMessageHidden(true);
            } else {
              setIsMessageHidden(false);
              handleClose();
              // todo go to user cabinet?? on
            }
          }}/>
        </DialogContent>
        {isMessageHidden && messageTag}
      </Dialog>
    </ThemeProvider>
  );
};
export default React.memo(ModalSignUp);