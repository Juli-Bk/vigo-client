import Actions from '../../constants/constants';
import {getUserIdFromCookie} from '../../../ajax/common/helper';
import AjaxUtils from '../../../ajax';
import {integrateCarts} from '../../../pages/ShoppingCart/cartHelpers';
import { getStorageData } from '../../../helpers/helpers';

export const changeShoppingCart = (data) => {
  return {type: Actions.CHANGE_SHOPPING_CART, payload: data};
};

export const getUserShopCart = () => {
  return (dispatch) => {
    const userId = getUserIdFromCookie();
    if (userId) {
      AjaxUtils.ShopCart.getUserShopCart(userId)
        .then(result => {
          if (result.status !== 400) {
            integrateCarts(result.products || []);
            dispatch(changeShoppingCart(getStorageData('shoppingCart')));
          }
        })
        .catch((error) => {
          console.log('getUserShopCart error', error);
        });
    }
  };
};