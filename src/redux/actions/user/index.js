import AjaxUtils from '../../../ajax';
import {
  deleteJWTcookie,
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

export const setUserDeliveryAddress = (deliveryAdr) => {
  return {
    type: Actions.SET_USER_DELIVERY_ADDRESS,
    payload: deliveryAdr
  };
};

export const loginUser = (email, password, callback) => {
  return (dispatch) => {
    const json = JSON.stringify({
      login: email,
      password
    });

    AjaxUtils.Users.login(json)
      .then(result => {
        const token = result.token;
        if (token) {
          putJWTtoCookie(token);
          dispatch(setJWTtoken(token.token));
        }

        if (result.user) {
          putUserIdToCookie(result);
          dispatch(setUser(result.user));
        }

        callback(result);
      })
      .catch(() => {
        dispatch(setUser({}));
        dispatch(setJWTtoken(''));
        deleteJWTcookie();
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
  return document.cookie.indexOf(cookieName + '=') === -1;
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

// todo add logout handler for UI click logout link/button
export const logout = () => {
  return (dispatch) => {
    dispatch(setUser({}));
    dispatch(setJWTtoken(''));
    deleteJWTcookie();
    // todo add push link to /login???
  };
};
