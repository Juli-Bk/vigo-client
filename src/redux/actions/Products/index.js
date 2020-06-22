import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';

export const getProductsByFilters = (filterArray, startPage, perPage, sort) => dispatch => {
  if (filterArray.length) {
    AjaxUtils.Products.getProductsByFilters(filterArray, startPage, perPage, sort)
      .then(result => {
        if (result && result.products) {
          dispatch({type: Actions.GET_PRODUCTS_BY_FILTERS, payload: result.products});
        }
      });
  }
};