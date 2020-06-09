import pathTo from '../common/paths';
import methods from '../common/methods';
import {checkId, getAuthHeader} from '../common/helper';

export default {
  /**
   * Returns colors collection.
   * Sends the request for address like:
   *        https://vigo-server.herokuapp.com/colors
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getAllColors: () => {
    return fetch(pathTo.colors, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getAllColors error', error.message));
  },
  /**
   * Returns color data by id
   * @param id {GUID} - required. color id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getColorById: (id) => {
    checkId(id);
    return fetch(`${pathTo.colors}/${id}`, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getColorById error', error.message));
  },
  /**
   * Creates new color. Uses JWT "jwt-admin" token
   * @param name {String} color name, "light blue" for example
   * @param baseColorName {String} base color name ONLY from list below, "blue" for example

   {name: 'black', hex: '#000000'}, {name: 'blue', hex: '#0000ff'},
   {name: 'orange', hex: '#ffa500'}, {name: 'peach', hex: '#ffdab9'},
   {name: 'cream', hex: '#f8f8de'}, {name: 'pink', hex: '#fc94a7'},
   {name: 'gold', hex: '#e3cf49'}, {name: 'purple', hex: '#e004e0'},
   {name: 'green', hex: '#08d408'}, {name: 'red', hex: '#ff0000'},
   {name: 'grey', hex: '#808080'}, {name: 'silver', hex: '#e3e2e2'},
   {name: 'yellow', hex: '#ffff00'}, {name: 'white', hex: '#FFFFFF'},
   {name: 'mocha', hex: '#d0c7b6'}, {name: 'mint', hex: '#c1f1d9'},
   {name: 'beige', hex: '#d7b68f'}, {name: 'brown', hex: '#653606'},
   {name: 'multi', hex: '#ffffff'}, {name: 'animal', hex: '#ffffff'}

   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  addColor: (name, baseColorName) => {
    if (!name) throw new TypeError('empty color name');
    if (!baseColorName) throw new TypeError('empty base color name');

    const color = {
      name,
      baseColorName
    };

    const requestOptions = {
      headers: getAuthHeader(),
      body: JSON.stringify(color),
      ...methods.PUT
    };

    return fetch(pathTo.colors, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('addColor error', error.message));
  },
  /**
   * Updates color data by id. Uses JWT "jwt-admin" token
   * @param id {GUID} required. color id
   * @param formData {Object} color data to update
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  updateColorById: (id, formData) => {
    checkId(id);
    if (!formData) throw new TypeError('empty color form data');

    const requestOptions = {
      headers: getAuthHeader(),
      body: formData,
      ...methods.POST
    };

    return fetch(`${pathTo.colors}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('updateColorById error', error.message));
  },
  /**
   * Deletes color data by id
   * @param id {GUID} required. color id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  deleteColorById: (id) => {
    checkId(id);

    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(`${pathTo.color}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteColorById error', error.message));
  },
  /**
   * Deletes all colors data from data base
   * @returns {Promise<string | void>} returns Promise. Use then method on it to get response result
   */
  deleteAllColors: () => {
    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(pathTo.colors, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteAllColors error', error.message));
  }
};