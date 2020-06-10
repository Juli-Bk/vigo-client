import pathTo from '../common/paths';
import methods from '../common/methods';
import {checkId, getAuthHeader} from '../common/helper';

export default {
  /**
   * Returns size tables collection collection.
   * Sends the request for address like:
   *        https://vigo-server.herokuapp.com/sizeTables
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getAllSizeTables: () => {
    return fetch(pathTo.sizeTables, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getAllSizeTables error', error.message));
  },
  /**
   * Returns size table data by product id
   * @param productId {GUID} - required. products id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getSizeTableByProductId: (productId) => {
    checkId(productId);
    return fetch(`${pathTo.sizeTables}/${productId}`, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getSizeTableByProductId error', error.message));
  },
  /**
   * Creates new size table for product. Uses JWT "jwt-admin" token
   * @param productId {GUID} - product id
   * @param sizeId {GUID} - size id
   * @param measurements {Array} array of size measurements: bust, waist, hips, footLength, length, headSize
   * bust: {
   *        inches: { 10 },
   *        cm: { 12 }
   * }
   *
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  addSizeTable: (productId, sizeId, measurements) => {
    checkId(productId);
    checkId(sizeId);
    if (!measurements.length) throw new TypeError('empty measurements data');

    const data = Object.assign({
      productId,
      sizeId
    }, ...measurements);

    const requestOptions = {
      headers: getAuthHeader(),
      body: JSON.stringify(data),
      ...methods.PUT
    };

    return fetch(pathTo.sizeTables, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('addSizeTable error', error.message));
  },
  /**
   * Updates size table data by id. Uses JWT "jwt-admin" token
   * @param id {GUID} required. size table id
   * @param formData {Object} size table data to update
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  updateSizeTableById: (id, formData) => {
    checkId(id);
    if (!formData) throw new TypeError('empty size table form data');

    const requestOptions = {
      headers: getAuthHeader(),
      body: formData,
      ...methods.POST
    };

    return fetch(`${pathTo.sizeTables}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('updateSizeTableById error', error.message));
  },
  /**
   * Deletes size table data by id
   * @param id {GUID} required. size table id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  deleteSizeTableById: (id) => {
    checkId(id);

    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(`${pathTo.sizeTables}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteSizeTableById error', error.message));
  },
  /**
   * Deletes all size tables data for all products from data base
   * @returns {Promise<string | void>} returns Promise.
   * Use then method on it to get response result
   */
  deleteAllSizeTables: () => {
    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(pathTo.sizeTables, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteAllSizeTables error', error.message));
  }
};