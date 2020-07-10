import pathTo from '../common/paths';
import methods from '../common/methods';
import {checkId, getAuthHeader, getQueryString} from '../common/helper';

export default {
  /**
   * Returns users collection. To get pagination or sorting response add optional parameters
   * Sends the request for address like:
   *        https://vigo-server.herokuapp.com/users?perPage=2&startPage=1&sort=-firstName
   *
   * @param startPage {undefined | Number} - optional parameter. current pagination step
   * @param perPage {undefined | Number} - optional parameter. users count for 1 page
   * @param sort {undefined | String} - optional parameter.
   *        for example "firstName" - will sort by firstName field ASC,
   *                   "-firstName" - will sort by firstName DESC
   *
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getAllUsers: (startPage, perPage, sort) => {
    const query = getQueryString({
      startPage,
      perPage,
      sort
    });

    const reqAdr = query.length
      ? `${pathTo.users}?${query}`
      : pathTo.users;

    const requestOptions = {
      headers: getAuthHeader(),
      ...methods.GET
    };

    return fetch(reqAdr, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('getAllUsers error', error.message));
  },
  /**
   * Returns user data if user is authorized
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getUser: () => {
    const requestOptions = {
      headers: getAuthHeader(),
      ...methods.GET
    };

    return fetch(pathTo.customer, requestOptions)
      .then(async (response) => {
        const respData = await response.json();
        return {
          status: response.status,
          statusText: response.statusText,
          user: respData.user
        };
      })
      .catch(error => console.log('getUser error', error.message));
  },
  /**
   * Creates new user. Registration process
   * @param formData {Object} user data: email or login, password
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  createUser: (formData) => {
    if (!formData) throw new TypeError('empty form data. email, login, password must be specified');

    const requestOptions = {
      body: formData,
      ...methods.PUT,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch(pathTo.register, requestOptions)
      .then(async (response) => {
        const respData = await response.json();
        return Object.assign({
          status: response.status,
          statusText: response.statusText
        }, respData);
      })
      .catch(error => console.log('createUser error', error.message));
  },
  /**
   * Updates user data by id
   * @param id {GUID} required. User id
   * @param formData {Object} user data and file(avatar image). Specify file with key 'user-avatar'
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  updateUserInfoById: (id, formData) => {
    checkId(id);
    if (!formData) throw new TypeError('empty form data');

    const data = JSON.stringify({
      id,
      ...formData
    });

    const requestOptions = {
      headers: getAuthHeader(),
      body: data,
      ...methods.POST
    };

    return fetch(pathTo.users, requestOptions)
      .then(async (response) => {
        const respData = await response.json();
        return Object.assign({
          status: response.status,
          statusText: response.statusText
        }, respData);
      })
      .catch(error => console.log('updateUserInfoById error', error.message));
  },
  /**
   * Changes user password
   * @param id {GUID} required. User id
   * @param formData {Object} user data: oldPassword, newPassword
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  updatePassword: (id, formData) => {
    checkId(id);
    if (!formData) throw new TypeError('empty form data');

    const data = JSON.stringify({...formData, id});

    const requestOptions = {
      headers: getAuthHeader(),
      body: data,
      ...methods.POST
    };

    return fetch(pathTo.password, requestOptions)
      .then(async (response) => {
        const respData = await response.json();
        return Object.assign({
          status: response.status,
          statusText: response.statusText
        }, respData);
      })
      .catch(error => console.log('updatePassword error', error.message));
  },
  /**
   * Deletes user by id
   * @param id {GUID} required. user id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  deleteUserById: (id) => {
    checkId(id);

    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(`${pathTo.users}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteUserById error', error.message));
  },
  /**
   * Deletes all customers data from DB, except admins users
   * @returns {Promise<string | void>} returns Promise. Use then method on it to get response result
   */
  deleteAllCustomers: () => {
    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(pathTo.users, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteAllCustomers error', error.message));
  },
  /**
   * Logins user to app
   * @param formData {Object} user data: login(email), password
   * @returns {Promise<any | void>} returns Promise. Use .then() method on it to result
   */
  login: (formData) => {
    if (!formData) throw new TypeError('empty form data');

    const requestOptions = {
      body: formData,
      ...methods.POST,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch(pathTo.login, requestOptions)
      .then(async (response) => {
        const respData = await response.json();
        return Object.assign({
          status: response.status,
          statusText: response.statusText
        }, respData);
      })
      .catch(error => console.log('login error', error.message));
  },
  /**
   * performs token refresh if needed cookie exists
   * @returns {Promise<Response | void>} returns Promise. Use then method on it to get response result
   */
  refreshLogin: () => {
    return fetch(pathTo.loginRefresh, methods.POST)
      .then(async (response) => {
        const respData = await response.json();
        return Object.assign({
          status: response.status,
          statusText: response.statusText
        }, respData);
      })
      .catch(error => console.log('refreshLogin error', error.message));
  },
  /**
   * Performs logout on server. Deletes both tokens from httpOnly cookie
   * @returns {Promise<Response | void>} returns Promise. Use then method on it to get response result
   */
  logOut: () => {
    return fetch(pathTo.logout, methods.POST)
      .then(async (response) => {
        const respData = await response.json();
        return Object.assign({
          status: response.status,
          statusText: response.statusText
        }, respData);
      })
      .catch(error => console.log('logOut error', error.message));
  },
  /**
   * Confirms user email
   * @param email {String} user email address
   * @returns {Promise<Response | void>} returns Promise. Use then method on it to get response result
   */
  confirmMyEmail: (email) => {
    if (!email) throw new TypeError('specify email address');

    return fetch(`${pathTo.emailConfirmation}?email=${email}`, methods.POST)
      .then(async (response) => {
        const respData = await response.json();
        return Object.assign({
          status: response.status,
          statusText: response.statusText
        }, respData);
      })
      .catch(error => console.log('confirmMyEmail error', error.message));
  },
  /**
   * Sends email with link by clicking on it user can proceed to new password setting
   * @param email {String} user email
   * @returns {Promise<Response | void>} returns Promise. Use then method on it to get response result
   */
  restorePasswordLetter: (email) => {
    if (!email) throw new TypeError('specify email address');

    const fingerprint = window.navigator.userAgent;
    return fetch(`${pathTo.restorePassword}?email=${email}&fingerprint=${fingerprint}`, methods.POST)
      .then(async (response) => {
        const respData = await response.json();
        return Object.assign({
          status: response.status,
          statusText: response.statusText
        }, respData);
      })
      .catch(error => console.log('restorePasswordLetter error', error.message));
  },
  /**
   * Sends confirmation letter for new email address
   * @param email {String} - email address to confirm
   * @returns {Promise<Response | void>} returns Promise. Use then method on it to get response resultl
   */
  sendConfirmLetter: (email) => {
    if (!email) throw new TypeError('specify email address');

    return fetch(`${pathTo.confirmation}?email=${email}`, methods.POST)
      .then(async (response) => {
        const respData = await response.json();
        return Object.assign({
          status: response.status,
          statusText: response.statusText
        }, respData);
      })
      .catch(error => console.log('sendConfirmLetter error', error.message));
  },
  /**
   * Updates user password with new value
   * @param formData {Object} contains user email and newPassword
   *      example: {newPassword: "password", email: "user@email.com"}
   * @param token {String} jwt token
   * @returns {Promise<Response | void>} returns Promise. Use then method on it to get response result
   */
  confirmPasswordRecover: (formData, token) => {
    if (!formData) throw new TypeError('empty form data');
    if (!token) throw new TypeError('empty token to restore password');

    const requestOptions = {
      body: JSON.stringify(formData),
      ...methods.POST,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return fetch(`${pathTo.restore}?token=${token}`, requestOptions)
      .then(async (response) => {
        const respData = await response.json();
        return Object.assign({
          status: response.status,
          statusText: response.statusText
        }, respData);
      })
      .catch(error => console.log('confirmPasswordRecover error', error.message));
  }
};