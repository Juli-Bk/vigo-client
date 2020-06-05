import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import LoginForm from '../LoginForm/LoginForm';
import useStyles from '../../containers/Header/headerStyle';
import theme from './ModalLoginTheme';
import {ThemeProvider} from '@material-ui/styles';
import PersonIcon from '@material-ui/icons/Person';
import {IconButton} from '@material-ui/core';

const ModalLogin = () => {
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
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}> */}
      {/* handleClickOpen<PersonButton classIncome={classes.personIcon}/> */}

      <IconButton
        variant="outlined" color="primary"
        aria-label="personIcon"
        onClick={handleClickOpen}
        className={classes.personIcon}>
        <PersonIcon/>
      </IconButton>
      {/* </Button> */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <LoginForm submitLoginHandler={(result) => {
            // todo set in header 'Welcome, User' if token
            console.log('login result', result);
            handleClose();
          }}/>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
export default React.memo(ModalLogin);