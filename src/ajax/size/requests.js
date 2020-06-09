import pathTo from '../common/paths';
import methods from '../common/methods';
import {checkId, getAuthHeader} from '../common/helper';

export default {
  /**
   * Returns sizes collection.
   * Sends the request for address like:
   *        https://vigo-server.herokuapp.com/sizes
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getAllSizes: () => {
    return fetch(pathTo.sizes, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getAllSizes error', error.message));
  },
  /**
   * Returns size data by id
   * @param id {GUID} - required. size id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getSizeById: (id) => {
    checkId(id);
    return fetch(`${pathTo.sizes}/${id}`, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getSizeById error', error.message));
  },
  /**
   * Creates new size. Uses JWT "jwt-admin" token
   * @param name {String} size name, "7.5" for example
   * @param sizeType {String} size type, "shoes" for example
   *                  ONLY from list below:
   *                 'clothing', 'shoes', 'hats', 'belts', 'scarves', 'one size'

   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  addSize: (name, sizeType) => {
    if (!name) throw new TypeError('empty size name');
    if (!sizeType) throw new TypeError('empty size type');

    const requestOptions = {
      headers: getAuthHeader(),
      body: JSON.stringify({
        name,
        sizeType
      }),
      ...methods.PUT
    };

    return fetch(pathTo.sizes, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('addSize error', error.message));
  },
  /**
   * Updates size data by id. Uses JWT "jwt-admin" token
   * @param id {GUID} required. size id
   * @param formData {Object} size data to update
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  updateSizeById: (id, formData) => {
    checkId(id);
    if (!formData) throw new TypeError('empty size form data');

    const requestOptions = {
      headers: getAuthHeader(),
      body: formData,
      ...methods.POST
    };

    return fetch(`${pathTo.sizes}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('updateSizeById error', error.message));
  },
  /**
   * Deletes size data by id
   * @param id {GUID} required. size id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  deleteSizeById: (id) => {
    checkId(id);

    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(`${pathTo.sizes}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteSizeById error', error.message));
  },
  /**
   * Deletes all sizes data from data base
   * @returns {Promise<string | void>} returns Promise.
   * Use then method on it to get response result
   */
  deleteAllSizes: () => {
    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(pathTo.sizes, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteAllSizes error', error.message));
  }
};