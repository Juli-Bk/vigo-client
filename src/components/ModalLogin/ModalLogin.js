import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginForm from '../LoginForm/LoginForm';
import PersonButton from '../PersonButton/PersonButton';
import useStyles from '../../containers/Header/headerStyle';
import theme from './ModalLoginTheme';
import { ThemeProvider } from '@material-ui/styles';

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
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          <PersonButton classIncome={classes.personIcon}/>
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Do you want to log in?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <LoginForm/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="default" autoFocus>
            Next
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};
export default React.memo(ModalLogin);