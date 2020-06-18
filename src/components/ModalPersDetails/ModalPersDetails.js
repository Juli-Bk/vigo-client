import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import theme from './ModalPersDetailsTheme';
import PersonalDetailsForm from '../PersonalDetailsForm/PersonalDetailsForm';
import useCommonStyles from '../../styles/formStyle/formStyle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import { setUser, setPersDetailsOpenState } from '../../redux/actions/actions';
import { connect} from 'react-redux';

const ModalPersDetails = (props) => {
  const {user, isPersDetailsModalOpen, setPersDetailsOpenState} = props;
  const commonClasses = useCommonStyles();
  const [message, setMessage] = useState('');
  const [isMessageHidden, setIsMessageHidden] = useState(false);

  const handleClickOpen = () => {
    setPersDetailsOpenState(true);
  };

  const handleClose = () => {
    setPersDetailsOpenState(false);
  };

  const messageTag = <DialogContent>
    <Typography variant='subtitle1' gutterBottom style={{
      color: '#f0877c'
    }}>{message}</Typography>
  </DialogContent>;

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Button className={commonClasses.button} onClick={handleClickOpen}>
        Change contact info
        </Button>
        <Dialog
          open={isPersDetailsModalOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent component='span' className={commonClasses.modalWindow}>
            <DialogContentText component='span' id="alert-dialog-description">
              <PersonalDetailsForm submitPersDetailsHandler={(result) => {
                if (result.status === 400) {
                  console.log(result);
                  setMessage(result.message);
                  setIsMessageHidden(true);
                } else if (result.status === 200) {
                  console.log(result);
                  setIsMessageHidden(false);
                  handleClose();
                } else {
                  handleClose();
                  // сохранить данные анонимного покупателя для дальнейшего оформления заказа
                  console.log('need to save guest data', result);
                }
              }} component='span' user={user}/>
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