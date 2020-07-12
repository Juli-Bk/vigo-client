import AjaxUtils from '../../../ajax';
import {
  deleteJWTcookie,
  deleteUserIdCookie,
  getJWTfromCookie,
  getUserIdFromCookie,
  putJWTtoCookie,
  putUserIdToCookie
} from '../../../ajax/common/helper';
import Actions from '../../constants/constants';
import {setLoading, setSnackMessage} from '../actions';
import { setStorageData } from '../../../helpers/helpers';
import globalConfig from '../../../globalConfig';

export const setJWTtoken = (token) => {
  return {
    type: Actions.SET_JWT_TOKEN,
    payload: token
  };
};

export const setUser = (userData) => {
  return {
    type: Actions.SET_USER,
    payload: userData
  };
};

export const setUserIsLoggedIn = (flag) => {
  return {
    type: Actions.IS_USER_LOGGED,
    payload: flag
  };
};

export const setUserDeliveryAddress = (deliveryAdr) => {
  return {
    type: Actions.SET_USER_DELIVERY_ADDRESS,
    payload: deliveryAdr
  };
};

export const registerUser = (userData, callback) => {
  return (dispatch) => {
    AjaxUtils.Users.createUser(userData)
      .then(result => {
        if (result && result.status !== 400) {
          const token = result.token;
          if (token) {
            putJWTtoCookie(token);
            dispatch(setJWTtoken(token.token));
          }

          if (result.user) {
            putUserIdToCookie(result);
            dispatch(setUser(result.user));
            dispatch(sendConfirmLetter(result.user.email));
          }
          dispatch(setUserIsLoggedIn(true));
        }
        callback && callback(result);
      })
      .catch((error) => {
        console.log(error);
        dispatch(clear());
        callback && callback();
      });
  };
};

export const loginUser = (email, password, callback) => {
  return (dispatch) => {
    const fingerprint = window.navigator.userAgent;
    const json = JSON.stringify({
      login: email,
      password,
      fingerprint
    });

    AjaxUtils.Users.login(json)
      .then(result => {
        if (result) {
          const token = result.token;
          if (token) {
            putJWTtoCookie(token);
            dispatch(setJWTtoken(token.token));
          }

          if (result.user) {
            putUserIdToCookie(result);
            dispatch(setUser(result.user));
          }
          dispatch(setUserIsLoggedIn(true));
        }
        callback(result);
      })
      .catch(() => {
        dispatch(clear());
        callback();
      });
  };
};

export const getUserData = () => {
  return (dispatch) => {
    const getData = () => {
      AjaxUtils.Users.getUser()
        .then(result => {
          if (result) {
            dispatch(setUser(result.user));
            dispatch(setUserIsLoggedIn(true));
          } else {
            dispatch(setUser({}));
          }
        })
        .catch(() => {
          dispatch(clear());
        });
    };

    const token = getJWTfromCookie();
    if (token) {
      getData();
    } else {
      dispatch(refreshToken(() => {
        const token = getJWTfromCookie();
        if (token) {
          getData();
        }
      }));
    }
  };
};

export const refreshToken = (callback) => {
  return (dispatch) => {
    const refToken = doesHttpOnlyCookieExist('refreshToken');

    // do not delete, if refToken is empty next request falls
    if (!refToken) {
      return;
    }

    AjaxUtils.Users.refreshLogin()
      .then(newToken => {
        if (newToken) {
          putJWTtoCookie(newToken);
          dispatch(setJWTtoken(newToken.token));
        } else {
          dispatch(clear());
        }
        callback && callback();
      })
      .catch(() => {
        dispatch(clear());
      });
  };
};

// huck check http only cookie exists
const doesHttpOnlyCookieExist = (cookieName) => {
  const date = new Date();
  date.setTime(date.getTime() + (1000));
  const expires = 'expires=' + date.toUTCString();

  document.cookie = cookieName + '=new_value;path=/;' + expires;
  const isExist = document.cookie.indexOf(cookieName + '=') === -1;

  // todo clear 'new_value' if error with old cookie occurs
  return isExist;
};

export const saveUserData = (data, callback) => {
  return (dispatch) => {
    const userId = getUserIdFromCookie() || data.id;
    if (userId) {
      AjaxUtils.Users.updateUserInfoById(userId, data)
        .then(newUserData => {
          callback(newUserData);
          dispatch(setUser(newUserData));
        })
        .catch(error => {
          console.log(error);
          callback();
        });
    } else {
      dispatch(clear());
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    AjaxUtils.Users.logOut()
      .then(() => {
        console.log('logged out successfully');
      })
      .catch((err) => {
        console.log('logged out error: ', err);
      });

    dispatch(clear());
  };
};

export const clear = () => {
  return (dispatch) => {
    dispatch(setUser({}));
    dispatch(setJWTtoken(''));
    dispatch(setUserIsLoggedIn(false));
    deleteJWTcookie();
    deleteUserIdCookie();
    setStorageData('user', {});
  };
};

export const confirmMyEmail = (email, callback) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    AjaxUtils.Users.confirmMyEmail(email)
      .then((rez) => {
        if (rez && rez.status !== 400) {
          dispatch(setUser(rez.user));
          dispatch(setSnackMessage(true,
            'Your email is confirmed',
            'success'));
        } else {
          dispatch(setSnackMessage(true, rez.message, 'error'));
        }
        dispatch(setLoading(false));
        callback && callback();
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };
};

export const sendRecoverPasswordLetter = (email, callback) => {
  return (dispatch) => {
    AjaxUtils.Users.restorePasswordLetter(email)
      .then((result) => {
        if (result && result.status !== 400) {
          dispatch(setSnackMessage(true,
            result.message,
            'success'));
        } else {
          dispatch(setSnackMessage(true,
            result.message,
            'error'));
        }
        dispatch(setLoading(false));
        callback && callback(result);
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };
};

export const sendConfirmLetter = (email, callback) => {
  return (dispatch) => {
    AjaxUtils.Users.sendConfirmLetter(email)
      .then((result) => {
        if (result && result.status !== 400) {
          dispatch(setSnackMessage(true,
            result.message,
            'success'));
        } else {
          dispatch(setSnackMessage(true,
            result.message,
            'error'));
        }
        dispatch(setLoading(false));
        callback && callback(result);
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };
};

export const saveRecoverPassword = (formData, token, callback) => {
  return (dispatch) => {
    AjaxUtils.Users.confirmPasswordRecover(formData, token)
      .then((result) => {
        if (result && result.status !== 400) {
          dispatch(setSnackMessage(true,
            result.message,
            'success'));
        } else {
          dispatch(setSnackMessage(true,
            result.message,
            'error'));
        }
        dispatch(setLoading(false));
        callback && callback(result);
      })
      .catch(error => {
        console.log(error);
        dispatch(setSnackMessage(true,
          'error occurs on server',
          'error'));
        dispatch(setLoading(false));
        callback && callback(null);
      });
  };
};

export const setUserNovaPoshtaData = (data) => {
  return {
    type: Actions.SET_USER_NOVA_POSHTA_DATA,
    payload: data
  };
};

export const saveNewPassword = (userId, data) => dispatch => {
  AjaxUtils.Users.updatePassword(userId, data)
    .then(result => {
      if (result && result.status === 400) {
        dispatch(setSnackMessage(true, 'Error occurred while changing password', 'error'));
      } else {
        dispatch(setSnackMessage(true, 'Your password is changed', globalConfig.snackSeverity.SUCCESS));
      }
    }).catch(err => {
      console.log('update password error happened', err);
    });
};