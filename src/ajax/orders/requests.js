import pathTo from '../common/paths';
import methods from '../common/methods';
import {checkId, getAuthHeader} from '../common/helper';

export default {
  /**
   * Returns all orders data. Needs JWT-admin token
   * Sends the request for address like:
   *        https://vigo-server.herokuapp.com/orders
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response
   */
  getAllOrders: () => {
    const requestOptions = {
      headers: getAuthHeader(),
      ...methods.GET
    };

    return fetch(pathTo.orders, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('getAllOrders error', error.message));
  },
  /**
   * Returns orders list for user
   * @param id {GUID} - required. user id. Needs JWT token
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  getUserOrders: (id) => {
    checkId(id);

    return fetch(`${pathTo.orders}/${id}`, methods.GET)
      .then(response => response.json())
      .catch(error => console.log('getUserOrders error', error.message));
  },
  /**
   * Adds new order. Might be performed for registered user and as "shop as a guest" mode
   * @param userId {GUID} User id. optional
   * @param products {Array} Product list in the order. required parameter
   * @param orderData {Object} order data. Required properties are:
   *                                       userName, deliveryAddress, email, phoneNumber
   *                                       shipping, paymentInfo, totalSum
   * Request example:
   * {
      "userId":"5edb9926dc7167002cdda7ef",
      "products": [
          {
              "productId": "5ee4ebc987ae95ab81b85fef", //required
              "sizeId": "5ee4ebad87ae95ab81b85f6d",
              "colorId": "5ee4eb9d87ae95ab81b85eb1",
              "quantity": 1 //required
          }
      ],
      "userName": "some name",
      "deliveryComfortTimeInterval": "13:00 - 18:00",
      "orderComment": "name password before enter the door",
      "deliveryAddress": "some adress",
      "shipping": "ukrposhta",
      "paymentInfo": "cash",
      "totalSum": 300,
      "email": "anna.ly@gmail.com",
      "phoneNumber": "+380506760000"
}
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  placeOrder: (userId = null, products, orderData) => {
    userId && checkId(userId);
    if (!products.length) throw new Error('Product list is empty. Can\'t place the order');

    const data = JSON.stringify({
      products,
      userId,
      ...orderData
    });

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
      ...methods.PUT
    };

    return fetch(pathTo.orders, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('placeOrder error', error.message));
  },
  /**
   * Deletes order. Need JWT token
   * @param id {GUID} required. order id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  deleteOrderById: (id) => {
    checkId(id);

    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(`${pathTo.orders}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteOrderById error', error.message));
  },
  /**
   * Deletes all orders for all users from data base. Need JWT-admin token
   * @returns {Promise<string | void>} returns Promise. Use then method on it to get response result
   */
  deleteAllOrders: () => {
    const requestOptions = {
      ...methods.DELETE,
      headers: getAuthHeader()
    };

    return fetch(pathTo.orders, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('deleteAllOrders error', error.message));
  },
  /**
   * Updates order by id
   * @param id {GUID} required. order id
   * @param formData {Object} order data to update
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  updateOrderById: (id, formData) => {
    checkId(id);
    if (!formData) throw new TypeError('empty form data');

    const data = JSON.stringify({
      ...formData
    });

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
      ...methods.POST
    };

    return fetch(`${pathTo.orders}/${id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('updateOrderById error', error.message));
  },
  /**
   * Cancel order by id
   * @param id {GUID} required. order id
   * @returns {Promise<any | void>} returns Promise. Use then method on it to get response result
   */
  cancelOrder: (id) => {
    checkId(id);

    return fetch(`${pathTo.cancelOrder}/${id}`, methods.POST)
      .then(response => response.json())
      .catch(error => console.log('cancelOrder error', error.message));
  }
};