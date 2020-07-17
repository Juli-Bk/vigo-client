import React, { useState, useMemo, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import theme from './ModalAddressTheme';
import AddressForm from '../AddressForm/AddressForm';
import useStyles from '../../containers/Header/headerStyle';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/styles';
import { setAddressModalOpenState, setCompletedSteps, setGuestData } from '../../redux/actions/actions';
import { connect} from 'react-redux';
import { Typography } from '@material-ui/core';
import useCommonStyles from '../../styles/formStyle/formStyle';
import AddressGuestForm from '../../components/AddressForm/AddressGuestForm';
import { getGuestInfo, getStorageData, setStorageData } from '../../helpers/helpers';

const ModalAddress = (props) => {
  const {
    user, guestData,
    isAddressModalOpen, setModalOpen,
    setGuestData, activeStep, setCompleted
  } = props;
  const commonClasses = useCommonStyles();
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [isMessageHidden, setIsMessageHidden] = useState(false);

  const guestInfo = getGuestInfo(guestData);

  const handleClickOpen = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  const messageTag = <DialogContent>
    <Typography variant='subtitle1' gutterBottom style={{
      color: '#f0877c'
    }}>{message}</Typography>
  </DialogContent>;

  const userForm = <AddressForm component='span'
    submitAddressHandler={(result) => {
      if (result) {
        if (result.status === 400) {
          setMessage(result.message);
          setIsMessageHidden(true);
        } else if (result.status === 200) {
          isAddressModalOpen && setIsMessageHidden(false);
          setCompleted(activeStep);
          handleClose();
        }
      }
      handleClose();
    }}/>;

  const guestForm = <AddressGuestForm component='span'
    saveGuestDataHandler={(deliveryAddress) => {
      if (deliveryAddress) {
        const data = {...guestData, deliveryAddress};
        setGuestData(data);
        const storageData = getStorageData('guestData');
        setStorageData('guestData', {...storageData, deliveryAddress});
      }
      setCompleted(activeStep);
      handleClose();
    }
    }/>;

  const form = useMemo(() => user._id ? userForm : guestForm, [guestForm, user._id, userForm]);
  const buttonText = useMemo(() =>
    form === guestForm && guestInfo && guestInfo.deliveryAddress ? 'change address' : 'add address',
  [form, guestForm, guestInfo]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Button className={commonClasses.button} onClick={handleClickOpen}>
          {buttonText}
        </Button>
        <Dialog
          open={isAddressModalOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            component='span'
            className={classes.modalWindow}>

            <DialogContentText component='span' id="alert-dialog-description">
              {form}
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
    isAddressModalOpen: store.modals.isAddressModalOpen,
    user: store.user,
    guestData: store.guestData,
    activeStep: store.checkout.checkoutSteps.active
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setModalOpen: isOpen => dispatch(setAddressModalOpenState(isOpen)),
    setGuestData: data => dispatch(setGuestData(data)),
    setCompleted: step => dispatch(setCompletedSteps(step))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ModalAddress));