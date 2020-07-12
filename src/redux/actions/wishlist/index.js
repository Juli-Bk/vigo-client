import Actions from '../../constants/constants';
import { getStorageData, saveWishListToLS, setStorageData } from '../../../helpers/helpers';
import { getUserIdFromCookie, isGuid } from '../../../ajax/common/helper';
import AjaxUtils from '../../../ajax';
import globalConfig from '../../../globalConfig';

export const changeWishList = () => {
  const data = getStorageData('wishList');
  return {type: Actions.CHANGE_WISH_LIST, payload: data};
};

export const getUserWishList = () => {
  return (dispatch) => {
    const userId = getUserIdFromCookie();
    if (userId && isGuid(userId)) {
      AjaxUtils.WishLists.getUserWishList(userId)
        .then(result => {
          const wishes = result.userWishList[0];
          const remoteWishes = wishes ? wishes.products : [];
          saveWishListToLS(remoteWishes);

          dispatch(changeWishList());
        })
        .catch((error) => {
          console.log('getUserWishList error', error);
        });
    }
  };
};

export const toggleWishItems = (productId) => dispatch => {
  const userId = getUserIdFromCookie();
  const wishListLocal = getStorageData('wishList');

  if (wishListLocal.includes(productId)) {
    const wishList = wishListLocal.filter(item => item !== productId);
    setStorageData('wishList', wishList);

    if (userId && isGuid(userId)) {
      AjaxUtils.WishLists.deleteProductFromWishlist(productId)
        .then(result => {
          if (result && result.status) {
            dispatch({
              type: Actions.SET_SNACK_MESSAGE_OPEN,
              payload: true,
              message: globalConfig.userMessages.NOT_AUTHORIZED,
              severity: globalConfig.snackSeverity.ERROR
            });
          }
        }).catch(err => {
          console.log('change wishlist error happened', err);
        });
    }
  } else {
    const wishList = [...wishListLocal, productId];
    setStorageData('wishList', wishList);

    if (userId && isGuid(userId)) {
      AjaxUtils.WishLists.addProductToWishList(productId, userId)
        .then(result => {
          if (result.status !== 200) {
            dispatch({
              type: Actions.SET_SNACK_MESSAGE_OPEN,
              payload: true,
              message: globalConfig.userMessages.NOT_AUTHORIZED,
              severity: globalConfig.snackSeverity.ERROR
            });
          }
        }).catch(err => {
          console.log('change wishlist error happened', err);
        });
    }
  }
};