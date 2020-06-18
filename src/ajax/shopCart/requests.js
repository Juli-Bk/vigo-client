import pathTo from '../common/paths';
import methods from '../common/methods';
import {checkId, getAuthHeader} from '../common/helper';

export default {
  /**
   * Returns shop carts data. Needs 'jwt-admin' token
   * Sends the request for address like:
   *        https://vigo-server.herokuapp.com/cart
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getAllUShopCarts: () => {
    return fetch(pathTo.cart, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getAllUShopCarts error', error.message));
  },
  /**
   * Returns user shop cart data. needs 'jwt' token
   * @param userId {GUID} - required. userId
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getUserShopCart: (userId) => {
    checkId(userId);
    return fetch(`${pathTo.cart}/${userId}`, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getUserShopCart error', error.message));
  },
  /**
   * Creates new shop cart.
   * @param userId {GUID} userId - existed user id. Optional parameter.
   *                      shop cart might be saved for unregistered user
   * @param products {Array} products in shop cart. Required
   *  Example json request body:
   * {
   * "userId":"5ece726eef69850025d7f1ca",
   * "products":[
   *  {
   *  "productId": "5edf5173cb33a1322b83c1e1",
   *  "cartQuantity": 1,
   *  "sizeId": "5edf4f5de55cc632053b8298",
   *  "colorId": "5edf4ea4fb3a6231dd8f3b78"
   *  }
   *]
   *}
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  createShopCart: (userId, products) => {
    if (userId) checkId(userId);
    if (!products.length) throw new TypeError('empty products list in the cart');

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        products
      }),
      ...methods.PUT
    };

    return fetch(pathTo.cart, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('createShopCart error', error.message));
  },
  /**
   * Updates shop cart data by id
   * @param id {GUID} shop cart id - required parameter
   * @param products {Array} list of product items. For example:
   *   {
   *  "productId": "5edf5173cb33a1322b83c1e1",
   *  "cartQuantity": 1,
   *  "sizeId": "5edf4f5de55cc632053b8298",
   *  "colorId": "5edf4ea4fb3a6231dd8f3b78"
   *  }
   * @param userId {GUID} user id. Optional parameter.
   *                      Might be changed, if user decided to register, but cart was created earlier
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  updateShopCartById: (id, products = [], userId) => {
    checkId(id);

    const data = {products};
    if (userId && checkId(id)) {
      data.userId = userId;
    }

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      ...methods.POST
    };

    return fetch(`${pathTo.cart}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('updateShopCartById error', error.message));
  },
  /**
   * Deletes shop cart by id
   * @param id {GUID} required. shop cart id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  deleteShopCartById: (id) => {
    checkId(id);

    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(`${pathTo.cart}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteShopCartById error', error.message));
  },
  /**
   * Deletes all shop carts data from data base. needs jwt-admin token
   * @returns {Promise<string | void>} returns Promise.
   * Use then method on it to get response result
   */
  deleteAllShopCarts: () => {
    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(pathTo.cart, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteAllShopCarts error', error.message));
  }
};