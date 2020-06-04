import pathTo from '../common/paths';
import methods from '../common/methods';
import {checkId, getAuthHeader} from '../common/helper';

export default {
  /**
   * Returns all users wish lists collection. Needs JWT-admin token
   * Sends the request for address like:
   *        https://vigo-server.herokuapp.com/wishlist
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response
   */
  getAllWishListData: async () => {
    const requestOptions = {
      headers: getAuthHeader(),
      ...methods.GET
    };

    return fetch(pathTo.wishlist, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('getAllWishListData error', error.message));
  },
  /**
   * Returns wish list for user
   * @param id {GUID} - required. user id. Needs JWT token
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getUserWishList: (id) => {
    checkId(id);
    return fetch(`${pathTo.wishlist}/${id}`, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getUserWishList error', error.message));
  },
  /**
   * Adds specified product to user wishlist
   * @param productId {GUID} Product for wish list. User should login. Need JWT token
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  addProductToWishList: (productId) => {
    checkId(productId);

    const requestOptions = {
      headers: getAuthHeader(),
      body: {
        productId
      },
      ...methods.PUT
    };

    return fetch(pathTo.wishlist, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('addProductToWishList error', error.message));
  },
  /**
   * Deletes product from user wishlist. Need JWT token
   * @param productId {GUID} required. Product id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  deleteProductFromWishlist: (productId) => {
    checkId(productId);

    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(`${pathTo.wishlist}/${productId}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteProductFromWishlist error', error.message));
  },
  /**
   * Deletes all wishList data  for all users from data base. Need JWT-admin token
   * @returns {Promise<string | void>} returns Promise. Use then method on it to get response result
   */
  deleteAllWishes: () => {
    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(pathTo.wishlist, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteAllWishes error', error.message));
  }
};