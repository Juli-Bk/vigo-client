import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';
import { changeOrder, getStorageData, setStorageData } from '../../../helpers/helpers';

export const getProductsByFilters = (filterArray, startPage, perPage, sort) => dispatch => {
  if (filterArray && filterArray.length) {
    dispatch({type: Actions.SET_LOADING_PROCESS, payload: true});
    AjaxUtils.Products.getProductsByFilters(filterArray, startPage, perPage, sort)
      .then(result => {
        if (result) {
          dispatch({
            type: Actions.GET_PRODUCTS_BY_FILTERS,
            products: result.products,
            totalCount: result.totalCount
          });
          dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
        }
      }).catch(err => {
        dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
        console.log('get products by filters request failed', err);
      });
  }
};

export const getMaxPrice = () => dispatch => {
  AjaxUtils.Products.getMaxPrice()
    .then(result => {
      if (result.maxSalePrice) {
        dispatch({type: Actions.GET_MAX_PRICE, payload: result.maxSalePrice});
      }
    }).catch(err => {
      console.log('get max price request failed', err);
    });
};

export const getFeatured = () => dispatch => {
  dispatch({type: Actions.SET_LOADING_PROCESS, payload: true});
  AjaxUtils.Products.getProductsByFilters([{featured: true}], 1, 15, '')
    .then(result => {
      if (result && result.products) {
        dispatch({
          type: Actions.GET_FEATURED,
          data: result.products,
          name: 'featured'
        });
        dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
      }
    }).catch(err => {
      console.log('get featured products request failed', err);
    });
};

export const getSpecial = () => dispatch => {
  AjaxUtils.Products.getProductsByFilters([{special: true}], 1, 15, '')
    .then(result => {
      if (result && result.products) {
        dispatch({
          type: Actions.GET_SPECIAL,
          data: result.products,
          name: 'special'
        });
      }
    }).catch(err => {
      console.log('get special products request failed', err);
    });
};

export const getNewArrivals = () => dispatch => {
  AjaxUtils.Products.getProductsByFilters([{new: true}], 1, 15, '')
    .then(result => {
      if (result && result.products) {
        dispatch({
          type: Actions.GET_NEW_ARRIVALS,
          data: result.products,
          name: 'newArrivals'
        });
      }
    }).catch(err => {
      console.log('get new products request failed', err);
    });
};

export const getBestsellers = (perPage) => dispatch => {
  dispatch({type: Actions.SET_LOADING_PROCESS, payload: true});
  AjaxUtils.Products.getProductsByFilters([{bestseller: true}], 1, perPage, '')
    .then(result => {
      if (result && result.products) {
        dispatch({
          type: Actions.GET_BESTSELLERS,
          payload: result.products
        });
        dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
      }
    }).catch(err => {
      console.log('get best sellers request failed', err);
    });
};

export const getRecentlyViewed = (productId) => dispatch => {
  const dataFromStorage = getStorageData('recentlyViewed');
  const filterArray = dataFromStorage.length ? [{_id: dataFromStorage}] : [];

  if (filterArray.length) {
    dispatch({type: Actions.SET_LOADING_PROCESS, payload: true});
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
      }).catch(err => {
        console.log('get recently viewed products request failed', err);
      });
    dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
  }
};

export const searchProducts = (searchString) => dispatch => {
  dispatch({type: Actions.SET_LOADING_PROCESS, payload: true});
  AjaxUtils.Products.searchProducts(searchString)
    .then(result => {
      console.log(result);
      if (result) {
        dispatch({
          type: Actions.SEARCH_PRODUCTS,
          products: result.products,
          totalCount: result.totalCount
        });
        dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
      }
    }).catch(err => {
      dispatch({type: Actions.SET_LOADING_PROCESS, payload: false});
      console.log('search products request failed', err);
    });
};