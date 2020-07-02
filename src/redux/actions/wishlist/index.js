import Actions from '../../constants/constants';
import {getStorageData, saveWishListToLS} from '../../../helpers/helpers';
import {getUserIdFromCookie, isGuid} from '../../../ajax/common/helper';
import AjaxUtils from '../../../ajax';

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