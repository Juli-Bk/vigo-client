import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import theme from './ModalAddressTheme';
import AddressForm from '../AddressForm/AddressForm';
import useStyles from '../../containers/Header/headerStyle';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/styles';
import { setUser } from '../../redux/actions/actions';
import { connect} from 'react-redux';

const ModalAddress = (props) => {
  const {user} = props;
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
        Change delivery address
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Do you want to change delivery address?'}</DialogTitle>
          <DialogContent className={classes.modalWindow}>
            <DialogContentText id="alert-dialog-description">
              <Card component='span'>
                <AddressForm component='span' user={user}/>
              </Card>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} autoFocus>
            Next
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};
const mapStateToProps = store => {
  return {
    user: store.user,
    token: store.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setUser: data => dispatch(setUser(data))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ModalAddress));