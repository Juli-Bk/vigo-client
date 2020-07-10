import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';
import globalConfig from '../../../globalConfig';
import { filterWishList, setStorageData } from '../../../helpers/helpers';
import { handleCart } from '../shopCart';
import { changeWishList } from '../wishlist';

export const placeOrder = (userId, products, orderData) => dispatch => {
  dispatch({type: Actions.SET_LOADING_PROCESS, payload: true});
  AjaxUtils.Orders.placeOrder(userId, products, orderData)
    .then(result => {
      dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
      if (result.newOrder) {
        dispatch({
          type: Actions.SET_ORDER_DATA,
          orderNumber: result.newOrder.orderNo,
          products: result.newOrder.products
        });
        dispatch({
          type: Actions.SET_SNACK_MESSAGE_OPEN,
          payload: true,
          message: 'We got your order',
          severity: globalConfig.snackSeverity.SUCCESS
        });
        setStorageData('shoppingCart', []);
        filterWishList(products);
        dispatch({type: Actions.CHANGE_SHOPPING_CART, payload: []});
        dispatch(changeWishList());
        dispatch(handleCart([]));
        dispatch({type: Actions.SET_GUEST_DATA, payload: {}});
        setStorageData('guestData', {});
      } else {
        dispatch({
          type: Actions.SET_SNACK_MESSAGE_OPEN,
          payload: true,
          message: result.message,
          severity: globalConfig.snackSeverity.ERROR
        });
      }
    }).catch(err => {
      console.log(err);
      dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
    });
};

export const getUserOrders = (userId) => dispatch => {
  dispatch({type: Actions.SET_LOADING_PROCESS, payload: true});
  AjaxUtils.Orders.getUserOrders(userId)
    .then(result => {
      dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
      if (result && result.userOrders) {
        dispatch({type: Actions.GET_USER_ORDERS, payload: result.userOrders});
      }
    }
    ).catch(err => {
      console.log(err);
      dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
    });
};

export const cancelOrder = (orderId, userId) => dispatch => {
  dispatch({type: Actions.SET_LOADING_PROCESS, payload: true});
  AjaxUtils.Orders.cancelOrder(orderId)
    .then(result => {
      dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
      if (result) {
        dispatch({
          type: Actions.SET_SNACK_MESSAGE_OPEN,
          payload: true,
          message: result.message,
          severity: globalConfig.snackSeverity.SUCCESS
        });
        dispatch(getUserOrders(userId));
      }
    }).catch(err => {
      console.log(err);
      dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
    });
};