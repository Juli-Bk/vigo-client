import React, {useCallback, useState} from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import useStyles from '../../containers/Header/headerStyle';
import useCommonStyles from '../../styles/formStyle/formStyle';
import theme from '../../styles/formStyle/formStyleTheme';
import PersonIcon from '@material-ui/icons/Person';
import SwipeableViews from 'react-swipeable-views';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {IconButton, Typography} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {connect} from 'react-redux';
import {setLoginModalOpenState} from '../../redux/actions/actions';
import {setUserIsLoggedIn} from '../../redux/actions/user';
import {withRouter} from 'react-router';

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
};

const TabPanel = (props) => {
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
};

const ModalLogin = (props) => {
  const {open, setOpen, history, location, userIsLoggedIn, setUserIsLoggedIn} = props;
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(0);
  const [isMessageHidden, setIsMessageHidden] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback((flag) => {
    if (location.pathname === '/account') {
      history.go(0);
    }
    setOpen(false);
    if (flag) {
      setUserIsLoggedIn(true);
    }
  }, [history, location.pathname, setOpen, setUserIsLoggedIn]);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
    setMessage('');
    setIsMessageHidden(false);
  }, []);

  const handleChangeIndex = useCallback((index) => {
    setValue(index);
  }, []);

  const messageTag = <DialogContent>
    <Typography variant='subtitle1' gutterBottom style={{
      color: '#f0877c'
    }}>{message}</Typography>
  </DialogContent>;

  return (
    <>
      {
        !userIsLoggedIn && <>
          <IconButton
            variant="outlined" color="primary"
            aria-label="personIcon"
            onClick={handleClickOpen}
            className={classes.personIcon}>
            <PersonIcon/>
          </IconButton>
          <ThemeProvider theme={theme}>
            <Dialog
              open={open}
              onClose={() => {
                handleClose(false);
              }}
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
                      if (result) {
                        if (result && result.status === 400) {
                          setMessage(result.message);
                          setIsMessageHidden(true);
                        } else {
                          isMessageHidden && setIsMessageHidden(false);
                          handleClose(true);
                        }
                      } else {
                        isMessageHidden && setIsMessageHidden(false);
                        handleClose(false);
                      }
                    }}/>
                  </TabPanel>

                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <RegisterForm submitRegisterHandler={(result) => {
                      if (result) {
                        if (result && result.status === 400) {
                          setMessage(result.message);
                          setIsMessageHidden(true);
                        } else {
                          isMessageHidden && setIsMessageHidden(false);
                          handleClose(true);
                          // todo go to user cabinet?? on
                        }
                      } else {
                        isMessageHidden && setIsMessageHidden(false);
                        handleClose(false);
                      }
                    }}/>
                  </TabPanel>
                </SwipeableViews>
                {isMessageHidden && messageTag}
              </DialogContent>
            </Dialog>
          </ThemeProvider>
        </>
      }
    </>
  );
};

const mapStoreToProps = store => {
  return {
    open: store.isLoginModalOpen,
    userIsLoggedIn: store.userIsLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpen: isOpen => dispatch(setLoginModalOpenState(isOpen)),
    setUserIsLoggedIn: flag => dispatch(setUserIsLoggedIn(flag))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(withRouter(ModalLogin)));