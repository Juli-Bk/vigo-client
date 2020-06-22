import pathTo from '../common/paths';
import methods from '../common/methods';
import {
  checkId,
  getAuthHeader,
  getQueryString
} from '../common/helper';

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

    const requestOptions = {
      headers: getAuthHeader(),
      body: {
        ...formData,
        id
      },
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
  }
};