import Actions from '../../constants/constants';
import {getUserIdFromCookie} from '../../../ajax/common/helper';
import AjaxUtils from '../../../ajax';
import {getStorageData, saveShopCartToLS} from '../../../helpers/helpers';

export const changeShoppingCart = () => {
  const data = getStorageData('shoppingCart');
  return {type: Actions.CHANGE_SHOPPING_CART, payload: data};
};

export const getUserShopCart = () => {
  return (dispatch) => {
    const userId = getUserIdFromCookie();
    if (userId) {
      AjaxUtils.ShopCart.getUserShopCart(userId)
        .then(result => {
          if (result.status !== 400) {
            saveShopCartToLS(result.products || []);
            dispatch(changeShoppingCart());
          }
        })
        .catch((error) => {
          console.log('getUserShopCart error', error);
        });
    }
  };
};