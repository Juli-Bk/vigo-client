import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import theme from './ModalPersDetailsTheme';
import PersonalDetailsForm from '../PersonalDetailsForm/PersonalDetailsForm';
import useStyles from '../../containers/Header/headerStyle';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/styles';
import { setUser, setPersDetailsOpenState } from '../../redux/actions/actions';
import { connect} from 'react-redux';

const ModalPersDetails = (props) => {
  const {user, setPersDetailsOpenState, isPersDetailsModalOpen} = props;
  const classes = useStyles();

  const handleClickOpen = () => {
    setPersDetailsOpenState(true);
  };

  const handleClose = () => {
    setPersDetailsOpenState(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Button onClick={handleClickOpen}>
        Change contact info
        </Button>
        <Dialog
          open={isPersDetailsModalOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent component='span' className={classes.modalWindow}>
            <DialogContentText component='span' id="alert-dialog-description">
              <PersonalDetailsForm component='span' user={user}/>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};
const mapStateToProps = store => {
  return {
    user: store.user,
    token: store.token,
    isPersDetailsModalOpen: store.isPersDetailsModalOpen
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setUser: data => dispatch(setUser(data)),
    setPersDetailsOpenState: data => dispatch(setPersDetailsOpenState(data))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ModalPersDetails));