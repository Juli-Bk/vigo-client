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
      // todo different branches for cash and credit card payment
      if (result.newOrder) {
        console.log(result);
        dispatch({
          type: Actions.SET_ORDER_NUMBER, payload: result.newOrder.orderNo
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
      }
    }).catch(err => {
      console.log(err);
      dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
    });
};
