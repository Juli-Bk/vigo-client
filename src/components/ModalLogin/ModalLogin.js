import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import LoginForm from '../LoginForm/LoginForm';
import useStyles from '../../containers/Header/headerStyle';
import useCommonStyles from '../../styles/formStyle/formStyle';
import theme from '../../styles/formStyle/formStyleTheme';
import {ThemeProvider} from '@material-ui/styles';
import PersonIcon from '@material-ui/icons/Person';
import {IconButton, Typography} from '@material-ui/core';
import RegisterForm from '../RegisterForm/RegisterForm';
import {connect} from 'react-redux';
import {setLoginModalOpenState} from '../../redux/actions/actions';

function a11yProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

function TabPanel (props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

const ModalLogin = ({isLoginModalOpen, setLoginModalOpenState}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [message, setMessage] = React.useState('');
  const [value, setValue] = React.useState(0);
  const [isMessageHidden, setIsMessageHidden] = React.useState(false);

  const handleClickOpen = () => {
    setLoginModalOpenState(true);
  };

  const handleClose = () => {
    setLoginModalOpenState(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMessage('');
    setIsMessageHidden(false);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
        open={isLoginModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={commonClasses.modalWindow}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="login or register"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
          </Tabs>

          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >

            <TabPanel value={value} index={0} dir={theme.direction}>
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
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
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
            </TabPanel>
          </SwipeableViews>
          {isMessageHidden && messageTag}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

const mapStoreToProps = store => {
  return {
    isLoginModalOpen: store.isLoginModalOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoginModalOpenState: isOpen => dispatch(setLoginModalOpenState(isOpen))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(ModalLogin));