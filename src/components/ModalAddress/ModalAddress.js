import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import theme from './ModalAddressTheme';
import AddressForm from '../AddressForm/AddressForm';
import useStyles from '../../containers/Header/headerStyle';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/styles';
import { setUser } from '../../redux/actions/actions';
import { connect} from 'react-redux';
import { Typography } from '@material-ui/core';
import useCommonStyles from '../../styles/formStyle/formStyle';

const ModalAddress = (props) => {
  const {user} = props;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isMessageHidden, setIsMessageHidden] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const commonClasses = useCommonStyles();
  const classes = useStyles();

  const messageTag = <DialogContent>
    <Typography variant='subtitle1' gutterBottom style={{
      color: '#f0877c'
    }}>{message}</Typography>
  </DialogContent>;

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Button className={commonClasses.button} onClick={handleClickOpen}>
        Change delivery address
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent component='span' className={classes.modalWindow}>
            <DialogContentText component='span' id="alert-dialog-description">
              <Card component='span'>
                <AddressForm submitAddressHandler={(result) => {
                  if (result.status === 400) {
                    setMessage(result.message);
                    setIsMessageHidden(true);
                  } else {
                    setIsMessageHidden(false);
                    handleClose();
                  }
                }} component='span' user={user}/>
              </Card>
            </DialogContentText>
            {isMessageHidden && messageTag}
          </DialogContent>
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