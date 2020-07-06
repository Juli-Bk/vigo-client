import Actions from '../../constants/constants';
import { getStorageData, saveCompareListToLS, setStorageData } from '../../../helpers/helpers';
import { getUserIdFromCookie, isGuid } from '../../../ajax/common/helper';
import AjaxUtils from '../../../ajax';

export const changeCompareList = () => {
  const data = getStorageData('compareList');
  return {type: Actions.CHANGE_COMPARE_LIST, payload: data};
};

export const getUserCompareList = () => {
  return (dispatch) => {
    const userId = getUserIdFromCookie();
    if (userId && isGuid(userId)) {
      AjaxUtils.CompareLists.getUserCompareList(userId)
        .then(result => {
          const compares = result.userCompareList[0];
          const remoteCompares = compares ? compares.products : [];
          saveCompareListToLS(remoteCompares);
          dispatch(changeCompareList());
        })
        .catch((error) => {
          console.log('getUserCompareList error', error);
        });
    }
  };
};

export const toggleCompareItems = (productId) => dispatch => {
  const userId = getUserIdFromCookie();
  const compareListLocal = getStorageData('compareList');

  if (compareListLocal.includes(productId)) {
    const compareList = compareListLocal.filter(item => item !== productId);
    setStorageData('compareList', compareList);

    if (userId && isGuid(userId)) {
      AjaxUtils.CompareLists.addProductToCompareList(productId, userId)
        .then(result => {
          if (result.status !== 200) {
            dispatch({
              type: Actions.SET_SNACK_MESSAGE_OPEN,
              payload: true
            });
          } else {
            dispatch({
              type: Actions.SET_SNACK_MESSAGE_OPEN,
              payload: true
            });
          }
        });
    }
  }
};