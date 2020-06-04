import pathTo from '../common/paths';
import methods from '../common/methods';
import store from '../../redux/store';
import {checkId, getAuthHeader} from '../common/helper';
import {setCategories} from '../../redux/actions/actions';

export default {
  /**
   * Returns categories collection.
   * Sends the request for address like:
   *        https://vigo-server.herokuapp.com/categories
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result:
   *        result => {
   *          categories: Array,
   *          categoriesTotalCount: Number,
   *          maxNestingLevel: Number
   *        }
   */
  getAllCategories: async () => {
    return new Promise((resolve, reject) => {
      const state = store.getState();
      if (state.categories.length) {
        resolve(state.categories);
      } else {
        fetch(pathTo.categories, methods.GET)
          .then(response => response.json())
          .then(response => {
            store.dispatch(setCategories(response));
            resolve(response);
          })
          .catch(error => {
            console.log('getAllCategories error', error.message);
            reject(error);
          });
      }
    });
  },
  /**
   * Returns category data by category id
   * @param id {GUID} - required. Category id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getCategoryById: (id) => {
    checkId(id);
    return fetch(`${pathTo.categories}/${id}`, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getCategoryById error', error.message));
  },
  /**
   * Creates new category
   * @param formData {Object} category data and file(image). use "category-image" flag for image file
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  addCategory: (formData) => {
    if (!formData) throw new TypeError('empty form data');

    // todo test with form data... see postman docs for example
    // IMPORTANT!!! category can have an image to represent yourself
    // because of multer npm package bug, put the file into the end of form data
    const requestOptions = {
      headers: getAuthHeader(),
      body: formData,
      ...methods.PUT
    };

    return fetch(pathTo.categories, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('addCategory error', error.message));
  },
  /**
   * Updates category data by id
   * @param id {GUID} required. category id
   * @param formData {Object} category data and file(image). use "category-image" flag for image file
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  updateCategoryById: (id, formData) => {
    checkId(id);
    if (!formData) throw new TypeError('empty form data');

    const requestOptions = {
      headers: getAuthHeader(),
      body: formData,
      ...methods.POST
    };

    return fetch(`${pathTo.categories}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('updateCategoryById error', error.message));
  },
  /**
   * Deletes category data by id
   * @param id {GUID} required. Category id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  deleteCategoryById: (id) => {
    checkId(id);

    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(`${pathTo.categories}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteCategoryById error', error.message));
  },
  /**
   * Deletes all categories data from data base
   * @returns {Promise<string | void>} returns Promise. Use then method on it to get response result
   */
  deleteAllCategories: () => {
    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(pathTo.categories, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteAllCategories error', error.message));
  }
};