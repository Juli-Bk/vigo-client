import pathTo from '../common/paths';
import methods from '../common/methods';
import {getAuthHeader} from '../common/helper';

export default {
  /**
   * Returns Subscribers collection.
   * Sends the request for address like:
   *        https://vigo-server.herokuapp.com/subscribers
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getAllSubscribers: () => {
    const requestOptions = {
      headers: getAuthHeader(),
      ...methods.GET
    };

    return fetch(pathTo.subscribers, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('getAllSubscribers error', error.message));
  },
  /**
   * Subscribes user to newsletters by email
   * @param email {String} email for newsletters
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  subscribe: (email) => {
    if (!email) throw new TypeError('empty email');

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email}),
      ...methods.PUT
    };

    return fetch(pathTo.subscribe, requestOptions)
      .then(response => {
        if (response.status !== 200) {
          return {
            statusText: response.statusText,
            status: response.status
          };
        }
        return response.json();
      })
      .catch(error => console.log('subscribe error', error.message));
  },
  /**
   * Unsubscribes user from newsletters by email
   * @param email {String} email to unsubscribe
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  unsubscribe: (email) => {
    if (!email) throw new TypeError('empty email');

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: {email},
      ...methods.POST
    };

    return fetch(pathTo.unsubscribe, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('unsubscribe error', error.message));
  },
  /**
   * Deletes all Subscribers data from data base
   * @returns {Promise<string | void>} returns Promise. Use then method on it to get response result
   */
  deleteAllSubscribers: () => {
    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(pathTo.subscribers, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteAllSubscribers error', error.message));
  }
};