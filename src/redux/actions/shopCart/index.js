import Actions from '../../constants/constants';
import {getUserIdFromCookie, isGuid} from '../../../ajax/common/helper';
import AjaxUtils from '../../../ajax';
import { integrateCarts } from '../../../pages/ShoppingCart/cartHelpers';
import {getStorageData, setStorageData} from '../../../helpers/helpers';
import globalConfig from '../../../globalConfig';
import { setSnackMessage } from '../actions';

export const changeShoppingCart = () => {
  const data = getStorageData('shoppingCart');
  return {type: Actions.CHANGE_SHOPPING_CART, payload: data};
};

export const getUserShopCart = () => {
  return (dispatch) => {
    const userId = getUserIdFromCookie();
    if (userId && isGuid(userId)) {
      AjaxUtils.ShopCart.getUserShopCart(userId)
        .then(result => {
          if (result && result.status !== 400) {
            integrateCarts(result.products || []);
            dispatch(changeShoppingCart());
          } else {
            setStorageData('shoppingCart', []);
            dispatch(changeShoppingCart());
          }
        })
        .catch((error) => {
          console.log('getUserShopCart error', error);
        });
    }
  };
};

export const setTotalSum = (sum) => {
  return {type: Actions.SET_TOTAL_SUM, payload: sum};
};

export const handleCart = (products) => dispatch => {
  const userId = getUserIdFromCookie();
  const cartId = getStorageData('cartId');
  if (userId && isGuid(userId)) {
    AjaxUtils.ShopCart.getUserShopCart(userId)
      .then(result => {
        if (result.message) {
          AjaxUtils.ShopCart.createShopCart(userId, products)
            .then(result => {
              if (result && result.status === 400) {
                dispatch(setSnackMessage(true, globalConfig.cartMessages.ERROR, globalConfig.snackSeverity.ERROR));
                console.log(result.message);
                setStorageData('shoppingCart', []);
                dispatch(changeShoppingCart());
              } else {
                if (result && result._id) {
                  setStorageData('cartId', result._id);
                }
              }
            }).catch(err => {
              dispatch(setSnackMessage(true, globalConfig.cartMessages.ERROR, globalConfig.snackSeverity.ERROR));
              console.log('cartHelper createShopCart error: ', err);
            });
        } else {
          AjaxUtils.ShopCart.updateShopCartById(result._id, products, result.userId)
            .then(result => {
              if (result && result.status === 400) {
                dispatch(setSnackMessage(true, globalConfig.cartMessages.ERROR, globalConfig.snackSeverity.ERROR));
                console.log(result.message);
              } else {
                if (result && result._id) {
                  setStorageData('cartId', result._id);
                }
              }
            }).catch(err => {
              dispatch(setSnackMessage(true, globalConfig.cartMessages.ERROR, globalConfig.snackSeverity.ERROR));
              console.log('cartHelper updateShopCartById error: ', err);
            });
        }
      });
  } else if (!userId && cartId.length) {
    AjaxUtils.ShopCart.updateShopCartById(cartId, products)
      .then(result => {
        if (result && result.status === 400) {
          dispatch(setSnackMessage(true, globalConfig.cartMessages.ERROR, globalConfig.snackSeverity.ERROR));
          console.log(result.message);
          if (result.message.includes('products')) {
            setStorageData('shoppingCart', []);
            dispatch(changeShoppingCart());
          }
          if (result.message.includes('cart')) {
            const invalidCartId = result.message.split('"')[1].split('"')[0];
            console.log(invalidCartId);
            setStorageData('cartId', '');
          }
        }
      }).catch(err => {
        dispatch(setSnackMessage(true, globalConfig.cartMessages.ERROR, globalConfig.snackSeverity.ERROR));
        console.log('cartHelper updateShopCartById error: ', err);
      });
  } else {
    AjaxUtils.ShopCart.createShopCart(null, products)
      .then(result => {
        if (result && result.status === 400) {
          dispatch(setSnackMessage(true, globalConfig.cartMessages.ERROR, globalConfig.snackSeverity.ERROR));
          setStorageData('shoppingCart', []);
          dispatch(changeShoppingCart());
          console.log(result.message);
        } else {
          if (result && result.cart) {
            setStorageData('cartId', result.cart._id);
          }
        }
      }).catch(err => {
        dispatch(setSnackMessage(true, globalConfig.cartMessages.ERROR, globalConfig.snackSeverity.ERROR));
        console.log('cartHelper createShopCart error: ', err);
      });
  }
};