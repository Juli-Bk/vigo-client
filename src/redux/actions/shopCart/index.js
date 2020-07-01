import Actions from '../../constants/constants';
import {getUserIdFromCookie} from '../../../ajax/common/helper';
import AjaxUtils from '../../../ajax';
import { integrateCarts } from '../../../pages/ShoppingCart/cartHelpers';
import {getStorageData, setStorageData} from '../../../helpers/helpers';
import globalConfig from '../../../globalConfig';

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
          if (result && result.status !== 400) {
            integrateCarts(result.products || []);
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
  if (userId) {
    AjaxUtils.ShopCart.getUserShopCart(userId)
      .then(result => {
        if (result.message) {
          AjaxUtils.ShopCart.createShopCart(userId, products)
            .then(result => {
              if (result && result.status === 400) {
                dispatch({
                  type: Actions.SET_SNACK_MESSAGE_OPEN,
                  payload: true,
                  message: globalConfig.cartMessages.ERROR,
                  severity: globalConfig.snackSeverity.ERROR
                });
                console.log(result.message);
              } else {
                if (result && result._id) {
                  dispatch({
                    type: Actions.SET_SNACK_MESSAGE_OPEN,
                    payload: true,
                    message: globalConfig.cartMessages.CREATED,
                    severity: globalConfig.snackSeverity.SUCCESS
                  });
                  setStorageData('cartId', result._id);
                }
              }
            }).catch(err => {
              dispatch({
                type: Actions.SET_SNACK_MESSAGE_OPEN,
                payload: true,
                message: globalConfig.cartMessages.ERROR,
                severity: globalConfig.snackSeverity.ERROR
              });
              console.log('cartHelper createShopCart error: ', err);
            });
        } else {
          AjaxUtils.ShopCart.updateShopCartById(result._id, products, result.userId)
            .then(result => {
              if (result && result.status === 400) {
                dispatch({
                  type: Actions.SET_SNACK_MESSAGE_OPEN,
                  payload: true,
                  message: globalConfig.cartMessages.ERROR,
                  severity: globalConfig.snackSeverity.ERROR
                });
                console.log(result.message);
              } else {
                if (result && result._id) {
                  dispatch({
                    type: Actions.SET_SNACK_MESSAGE_OPEN,
                    payload: true,
                    message: globalConfig.cartMessages.UPDATED,
                    severity: globalConfig.snackSeverity.SUCCESS
                  });
                  setStorageData('cartId', result._id);
                }
              }
            }).catch(err => {
              dispatch({
                type: Actions.SET_SNACK_MESSAGE_OPEN,
                payload: true,
                message: globalConfig.cartMessages.ERROR,
                severity: globalConfig.snackSeverity.ERROR
              });
              console.log('cartHelper updateShopCartById error: ', err);
            });
        }
      });
  } else if (!userId && cartId.length) {
    AjaxUtils.ShopCart.updateShopCartById(cartId, products)
      .then(result => {
        if (result && result.status === 400) {
          dispatch({
            type: Actions.SET_SNACK_MESSAGE_OPEN,
            payload: true,
            message: globalConfig.cartMessages.ERROR,
            severity: globalConfig.snackSeverity.ERROR
          });
          console.log(result.message);
        } else {
          dispatch({
            type: Actions.SET_SNACK_MESSAGE_OPEN,
            payload: true,
            message: globalConfig.cartMessages.UPDATED,
            severity: globalConfig.snackSeverity.SUCCESS
          });
        }
      }).catch(err => {
        dispatch({
          type: Actions.SET_SNACK_MESSAGE_OPEN,
          payload: true,
          message: globalConfig.cartMessages.ERROR,
          severity: globalConfig.snackSeverity.ERROR
        });
        console.log('cartHelper updateShopCartById error: ', err);
      });
  } else {
    AjaxUtils.ShopCart.createShopCart(null, products)
      .then(result => {
        if (result && result.status === 400) {
          dispatch({
            type: Actions.SET_SNACK_MESSAGE_OPEN,
            payload: true,
            message: globalConfig.cartMessages.ERROR,
            severity: globalConfig.snackSeverity.ERROR
          });
          console.log(result.message);
        } else {
          dispatch({
            type: Actions.SET_SNACK_MESSAGE_OPEN,
            payload: true,
            message: globalConfig.cartMessages.CREATED,
            severity: globalConfig.snackSeverity.SUCCESS
          });
          if (result && result.cart) {
            setStorageData('cartId', result.cart._id);
          }
        }
      }).catch(err => {
        dispatch({
          type: Actions.SET_SNACK_MESSAGE_OPEN,
          payload: true,
          message: globalConfig.cartMessages.ERROR,
          severity: globalConfig.snackSeverity.ERROR
        });
        console.log('cartHelper createShopCart error: ', err);
      });
  }
};