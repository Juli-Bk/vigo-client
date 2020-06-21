import AjaxUtils from '../../../ajax';
import {
  deleteJWTcookie,
  getToken,
  getUserIdFromCookie,
  putJWTtoCookie,
  putUserIdToCookie
} from '../../../ajax/common/helper';
import Actions from '../../constants/constants';

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

export const getUserTokenAndData = (email, password, callback) => {
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
    const clear = () => {
      dispatch(setUser({}));
      dispatch(setJWTtoken(''));
      deleteJWTcookie();
    };

    const token = getToken();
    if (token) {
      AjaxUtils.Users.getUser()
        .then(result => {
          dispatch(setUser(result.user));
        })
        .catch(() => clear());
    } else {
      clear();
    }
  };
};

export const saveUserData = (data, callback) => {
  return (dispatch) => {
    const clear = () => {
      dispatch(setUser({}));
      dispatch(setJWTtoken(''));
      deleteJWTcookie();
    };

    const userId = getUserIdFromCookie();
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
      clear();
    }
  };
};
