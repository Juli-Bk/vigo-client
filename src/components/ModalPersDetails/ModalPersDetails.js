import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import theme from './ModalPersDetailsTheme';
import PersonalDetailsForm from '../PersonalDetailsForm/PersonalDetailsForm';
import useStyles from '../../containers/Header/headerStyle';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/styles';

const ModalPersDetails = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Button onClick={handleClickOpen}>
        Change contact info
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Do you want to change your contact info?'}</DialogTitle>
          <DialogContent className={classes.modalWindow}>
            <DialogContentText id="alert-dialog-description">
              <Card component='span'>
                {/* <PersonalDetailsForm/> */}
                personal details form here. to check the mistake
              </Card>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} autoFocus>
            Change
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default React.memo(ModalPersDetails);