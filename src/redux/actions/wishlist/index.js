import Actions from '../../constants/constants';
import { getStorageData, integrateWishLists, setStorageData } from '../../../helpers/helpers';
import { getUserIdFromCookie, isGuid } from '../../../ajax/common/helper';
import AjaxUtils from '../../../ajax';
import globalConfig from '../../../globalConfig';
import { setLoading, setSnackMessage } from '../actions';

export const changeWishList = () => {
  const data = getStorageData('wishList');
  return {type: Actions.CHANGE_WISH_LIST, payload: data};
};

export const getUserWishList = () => dispatch => {
  const userId = getUserIdFromCookie();
  if (userId && isGuid(userId)) {
    AjaxUtils.WishLists.getUserWishList(userId)
      .then(result => {
        const wishes = result.userWishList[0];
        const remoteWishes = wishes ? wishes.products : [];
        integrateWishLists(remoteWishes, userId);
        dispatch(changeWishList());
      })
      .catch((error) => {
        console.log('getUserWishList error', error);
      });
  }
};

export const toggleWishItems = (productId) => dispatch => {
  const userId = getUserIdFromCookie();
  const wishListLocal = getStorageData('wishList');

  if (wishListLocal.includes(productId)) {
    const wishList = wishListLocal.filter(item => item !== productId);
    setStorageData('wishList', wishList);

    if (userId && isGuid(userId)) {
      dispatch(setLoading(true));
      AjaxUtils.WishLists.deleteProductFromWishlist(productId)
        .then(result => {
          dispatch(setLoading(false));
          if (result && result.status) {
            dispatch(setSnackMessage(true, globalConfig.userMessages.NOT_AUTHORIZED, globalConfig.snackSeverity.ERROR));
          }
        }).catch(err => {
          dispatch(setLoading(false));
          console.log('change wishlist error happened', err);
        });
    }
  } else {
    const wishList = [...wishListLocal, productId];
    setStorageData('wishList', wishList);

    if (userId && isGuid(userId)) {
      dispatch(setLoading(true));
      AjaxUtils.WishLists.addProductToWishList(productId, userId)
        .then(result => {
          dispatch(setLoading(false));
          if (result.status !== 200) {
            dispatch(setSnackMessage(true, globalConfig.userMessages.NOT_AUTHORIZED, globalConfig.snackSeverity.ERROR));
          }
        }).catch(err => {
          dispatch(setLoading(false));
          console.log('change wishlist error happened', err);
        });
    }
  }
};