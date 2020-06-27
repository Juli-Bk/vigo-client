import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';
import { changeOrder, getStorageData, setStorageData } from '../../../helpers/helpers';

export const getProductsByFilters = (filterArray, startPage, perPage, sort) => dispatch => {
  if (filterArray && filterArray.length) {
    AjaxUtils.Products.getProductsByFilters(filterArray, startPage, perPage, sort)
      .then(result => {
        if (result) {
          dispatch({
            type: Actions.GET_PRODUCTS_BY_FILTERS,
            products: result.products,
            totalCount: result.totalCount
          });
        }
      });
  }
};

export const getMaxPrice = () => dispatch => {
  AjaxUtils.Products.getMaxPrice()
    .then(result => {
      if (result.maxSalePrice) {
        dispatch({type: Actions.GET_MAX_PRICE, payload: result.maxSalePrice});
      }
    });
};

export const addFilters = (filtersObj) => {
  return {
    type: Actions.ADD_FILTERS,
    payload: filtersObj
  };
};

export const getFeatured = () => dispatch => {
  AjaxUtils.Products.getProductsByFilters([{featured: true}], 1, 15, '')
    .then(result => {
      if (result && result.products) {
        dispatch({
          type: Actions.GET_FEATURED,
          payload: result.products
        });
      }
    });
};

export const getSpecial = () => dispatch => {
  AjaxUtils.Products.getProductsByFilters([{special: true}], 1, 15, '')
    .then(result => {
      if (result && result.products) {
        dispatch({
          type: Actions.GET_SPECIAL,
          payload: result.products
        });
      }
    });
};

export const getNewArrivals = () => dispatch => {
  AjaxUtils.Products.getProductsByFilters([{new: true}], 1, 15, '')
    .then(result => {
      if (result && result.products) {
        dispatch({
          type: Actions.GET_NEW_ARRIVALS,
          payload: result.products
        });
      }
    });
};

export const getBestsellers = (perPage) => dispatch => {
  AjaxUtils.Products.getProductsByFilters([{bestseller: true}], 1, perPage, '')
    .then(result => {
      if (result && result.products) {
        dispatch({
          type: Actions.GET_BESTSELLERS,
          payload: result.products
        });
      }
    });
};

export const getRecentlyViewed = (productId) => dispatch => {
  const dataFromStorage = getStorageData('recentlyViewed');
  const filterArray = dataFromStorage.length ? [{_id: dataFromStorage}] : [];

  if (filterArray.length) {
    AjaxUtils.Products.getProductsByFilters(filterArray, 1, 8, '')
      .then(result => {
        if ((result.products && result.products.length) < dataFromStorage.length) {
          dispatch({
            type: Actions.GET_RECENTLY_VIEWED,
            payload: []
          });
          setStorageData('recentlyViewed', [productId]);
          return;
        }
        if (!result.message) {
          const data = changeOrder(dataFromStorage.filter(item => item !== productId), result.products);
          if (data.length) {
            dispatch({
              type: Actions.GET_RECENTLY_VIEWED,
              payload: data
            });
          }
        } else {
          const message = result.message;
          let wrongId = '';
          if (message.includes('_id')) {
            wrongId = message.split('/')[1];
          }
          setStorageData('recentlyViewed', [...dataFromStorage.filter(item => item !== wrongId)]);
        }
      });
  }
};
