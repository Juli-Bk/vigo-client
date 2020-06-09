import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import LoginForm from '../LoginForm/LoginForm';
import useStyles from '../../containers/Header/headerStyle';
import theme from './ModalLoginTheme';
import {ThemeProvider} from '@material-ui/styles';
import PersonIcon from '@material-ui/icons/Person';
import {IconButton, Typography} from '@material-ui/core';

const ModalLogin = () => {
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

      <IconButton
        variant="outlined" color="primary"
        aria-label="personIcon"
        onClick={handleClickOpen}
        className={classes.personIcon}>
        <PersonIcon/>
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <LoginForm submitLoginHandler={(result) => {
            if (result.status === 400) {
              setMessage(result.message);
              setIsMessageHidden(true);
            } else {
              setIsMessageHidden(false);
              handleClose();
              // todo change avatar
            }
          }}/>
          {isMessageHidden && messageTag}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};
export default React.memo(ModalLogin);