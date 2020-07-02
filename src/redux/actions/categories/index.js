import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';

export const setCategories = (categories) => {
  return {
    type: Actions.SET_CATEGORIES_LIST,
    payload: categories
  };
};

export const getCategories = () => {
  return (dispatch) => {
    AjaxUtils.Categories.getAllCategories()
      .then(result => {
        dispatch(setCategories(result));
      });
  };
};