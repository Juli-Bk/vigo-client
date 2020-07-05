import pathTo from '../common/paths';
import methods from '../common/methods';
import {checkId, getAuthHeader, getFilterString, getQueryString} from '../common/helper';

export default {
  /**
   * Returns products collection. To get pagination or sorting response add optional parameters
   * Sends the request for address like:
   *        https://vigo-server.herokuapp.com/products?perPage=2&startPage=1&sort=-name
   *
   * @param startPage {undefined | Number} - optional parameter. current pagination step
   * @param perPage {undefined | Number} - optional parameter. products count for 1 page
   * @param sort {undefined | String} - optional parameter.
   *        for example "name" - will sort by name field ASC,
   *                    "-name" - will sort by name DESC
   *
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getAllProducts: (startPage, perPage, sort) => {
    const query = getQueryString({
      startPage,
      perPage,
      sort
    });

    const reqAdr = query.length
      ? `${pathTo.products}?${query}`
      : pathTo.products;

    return fetch(reqAdr, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getAllProducts error', error.message));
  },
  /**
   * Returns max price and max sale price
   @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getMaxPrice: () => {
    return fetch(pathTo.maxPrice, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getMaxPrice error', error.message));
  },
  /**
   * Returns product data by product id
   * @param id {GUID} - required. Product id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getProductById: (id) => {
    checkId(id);
    return fetch(`${pathTo.products}/${id}`, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getProductById error', error.message));
  },
  /**
   * Returns product collection by filters. Sends the request for address like:
   * https://vigo-server.herokuapp.com/products/filter?name=4,gree&categoryId=5eb27e7bd47c1709352fc700&sort=-name
   * @param filterArray {Array} - filters array.
   *        Example filterArray =>>>>  [{name: "xx"}, {categoryId: "5eb27e7bd47c1709352fc700"}]
   * @param startPage {undefined | Number} - optional parameter. current pagination step
   * @param perPage {undefined | Number} - optional parameter. products count for 1 page
   * @param sort {undefined | String} - optional parameter.
   *        for example "name" - will sort by name field ASC,
   *                    "-name" - will sort by name DESC
   *
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getProductsByFilters: (filterArray, startPage, perPage, sort) => {
    const filterString = getFilterString(filterArray, {
      startPage,
      perPage,
      sort
    });

    const reqAdr = filterString.length
      ? `${pathTo.productsFilter}${filterString}`
      : pathTo.products;

    return fetch(reqAdr, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getProductsByFilters error', error.message));
  },
  /**
   * Returns products by search filter
   * @param searchString {String} required. Text search in product table
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  searchProducts: (searchString) => {
    if (!searchString) throw new TypeError('empty search string');
    const json = JSON.stringify({query: searchString});
    const requestOptions = {
      ...methods.POST,
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch(pathTo.productsSearch, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('searchProducts error', error.message));
  },
  /**
   * Creates new product
   * @param formData {Object} product data and files(images, video)
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  addNewProduct: (formData) => {
    if (!formData) throw new TypeError('empty form data');

    // todo test with form data... see postman docs for example
    const requestOptions = {
      headers: getAuthHeader(),
      body: formData,
      ...methods.PUT
    };

    return fetch(pathTo.products, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('addNewProduct error', error.message));
  },
  /**
   * Updates product data by id
   * @param id {GUID} required. Product id
   * @param formData {Object} product data and files(images, video)
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  updateProductById: (id, formData) => {
    checkId(id);
    if (!formData) throw new TypeError('empty form data');

    const requestOptions = {
      headers: getAuthHeader(),
      body: formData,
      ...methods.POST
    };

    return fetch(`${pathTo.products}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('updateProductById error', error.message));
  },
  /**
   * Deletes product data by id
   * @param id {GUID} required. Product id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  deleteProductById: (id) => {
    checkId(id);

    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(`${pathTo.products}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
  },
  /**
   * Deletes all products data from data base
   * @returns {Promise<string | void>} returns Promise. Use then method on it to get response result
   */
  deleteAllProducts: () => {
    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(pathTo.products, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteAllProducts error', error.message));
  }
};