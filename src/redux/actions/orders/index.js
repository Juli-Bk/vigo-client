import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';
import globalConfig from '../../../globalConfig';
import { filterWishList, setStorageData } from '../../../helpers/helpers';
import { handleCart } from '../shopCart';
import { changeWishList } from '../wishlist';
import { setGuestData, setLoading, setSnackMessage } from '../actions';

export const placeOrder = (userId, products, orderData) => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.Orders.placeOrder(userId, products, orderData)
    .then(result => {
      dispatch(setLoading(false));
      if (result.newOrder) {
        dispatch({
          type: Actions.SET_ORDER_DATA,
          orderNumber: result.newOrder.orderNo,
          products: result.newOrder.products
        });
        dispatch(setSnackMessage(true, 'We have got your order', globalConfig.snackSeverity.SUCCESS));
        setStorageData('shoppingCart', []);
        filterWishList(products);
        dispatch({type: Actions.CHANGE_SHOPPING_CART, payload: []});
        dispatch(changeWishList());
        dispatch(handleCart([]));
        dispatch(setGuestData({}));
        setStorageData('guestData', {});
      } else {
        dispatch(setSnackMessage(true, result.message, globalConfig.snackSeverity.ERROR));
      }
    }).catch(err => {
      console.log(err);
      dispatch(setLoading(false));
    });
};

export const getUserOrders = (userId) => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.Orders.getUserOrders(userId)
    .then(result => {
      dispatch(setLoading(false));
      if (result && result.userOrders) {
        dispatch({type: Actions.GET_USER_ORDERS, payload: result.userOrders});
      }
    }
    ).catch(err => {
      console.log(err);
      dispatch(setLoading(false));
    });
};

export const cancelOrder = (orderId, userId) => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.Orders.cancelOrder(orderId)
    .then(result => {
      dispatch(setLoading(false));
      if (result) {
        dispatch(setSnackMessage(true, result.message, globalConfig.snackSeverity.SUCCESS));
        dispatch(getUserOrders(userId));
      }
    }).catch(err => {
      console.log(err);
      dispatch(setLoading(false));
    });
};