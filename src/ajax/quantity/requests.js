import pathTo from '../common/paths';
import methods from '../common/methods';
import {checkId, getAuthHeader} from '../common/helper';

export default {
  /**
   * Returns quantity collection.
   * Sends the request for address like:
   *        https://vigo-server.herokuapp.com/quantity
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getAllQuantity: () => {
    return fetch(pathTo.quantity, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getAllQuantity error', error.message));
  },
  /**
   * Returns quantity data for product
   * @param productId {GUID} - required. productId
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getQuantityByProductId: (productId) => {
    checkId(productId);
    return fetch(`${pathTo.quantity}/${productId}`, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getQuantityByProductId error', error.message));
  },
  /**
   * Creates quantity for product. Uses JWT "jwt-admin" token
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   * @param productId - {GUID} - product id
   * @param colorId- {GUID} - color id
   * @param sizeId- {GUID} - size id
   * @param quantity- {Number} - quantity
   */
  addQuantity: (productId, colorId, sizeId, quantity) => {
    checkId(productId);
    checkId(colorId);
    checkId(sizeId);

    if (quantity === undefined) throw new TypeError('empty quantity');

    const requestOptions = {
      headers: getAuthHeader(),
      body: JSON.stringify({
        productId, colorId, sizeId, quantity
      }),
      ...methods.PUT
    };

    return fetch(pathTo.quantity, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('addQuantity error', error.message));
  },
  /**
   * Updates quantity data by id. Uses JWT "jwt-admin" token
   * @param id {GUID} required. quantity id
   * @param formData {Object} quantity data to update
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  updateQuantityById: (id, formData) => {
    checkId(id);
    if (!formData) throw new TypeError('empty quantity form data');

    const requestOptions = {
      headers: getAuthHeader(),
      body: formData,
      ...methods.POST
    };

    return fetch(`${pathTo.quantity}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('updateQuantityById error', error.message));
  },
  /**
   * Deletes quantity data by id
   * @param id {GUID} required. quantity id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  deleteQuantityById: (id) => {
    checkId(id);

    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(`${pathTo.quantity}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteQuantityById error', error.message));
  },
  /**
   * Deletes all quantity data from data base
   * @returns {Promise<string | void>} returns Promise.
   * Use then method on it to get response result
   */
  deleteAllQuantities: () => {
    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(pathTo.quantity, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteAllQuantities error', error.message));
  }
};