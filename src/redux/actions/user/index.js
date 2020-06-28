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
import {setLoginModalOpenState} from '../actions';

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
        }
        callback(result);
      })
      .catch(() => {
        dispatch(logout());
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
          dispatch(logout());
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
          console.log(newToken);
          dispatch(setJWTtoken(newToken.token));
        } else {
          dispatch(logout());
        }
        callback && callback();
      })
      .catch(() => {
        dispatch(logout());
        dispatch(setLoginModalOpenState(true));
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
      dispatch(logout());
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

    dispatch(setUser({}));
    dispatch(setJWTtoken(''));
    dispatch(setUserIsLoggedIn(false));
    deleteJWTcookie();
    deleteUserIdCookie();
  };
};
