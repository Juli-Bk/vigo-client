import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';
import {
  changeOrder, getStorageData, setStorageData,
  findBadId, removeBadIdFromStorage
} from '../../../helpers/helpers';
import {changeWishList} from '../wishlist';
import { changeShoppingCart } from '../shopCart';
import { setLoading } from '../actions';

export const getProductsByFilters = (filterArray, startPage, perPage, sort) => dispatch => {
  if (filterArray && filterArray.length) {
    dispatch(setLoading(true));
    AjaxUtils.Products.getProductsByFilters(filterArray, startPage, perPage, sort)
      .then(result => {
        dispatch(setLoading(false));
        if (result && result.message) {
          if (result.message.includes('_id')) {
            const badId = findBadId(result.message);
            removeBadIdFromStorage(badId);
            dispatch(changeWishList());
            dispatch(changeShoppingCart());
          }
        } else if (result && result.products) {
          dispatch({
            type: Actions.GET_PRODUCTS_BY_FILTERS,
            products: result.products,
            totalCount: result.totalCount
          });
        }
      }).catch(err => {
        dispatch(setLoading(false));
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
  dispatch(setLoading(true));
  AjaxUtils.Products.getProductsByFilters([{featured: true}], 1, 15, '')
    .then(result => {
      dispatch(setLoading(false));
      if (result && result.products) {
        dispatch({
          type: Actions.GET_FEATURED,
          data: result.products,
          name: 'featured'
        });
      }
    }).catch(err => {
      dispatch(setLoading(false));
      console.log('get featured products request failed', err);
    });
};

export const getSpecial = () => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.Products.getProductsByFilters([{special: true}], 1, 15, '')
    .then(result => {
      dispatch(setLoading(false));
      if (result && result.products) {
        dispatch({
          type: Actions.GET_SPECIAL,
          data: result.products,
          name: 'special'
        });
      }
    }).catch(err => {
      dispatch(setLoading(false));
      console.log('get special products request failed', err);
    });
};

export const getNewArrivals = () => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.Products.getProductsByFilters([{new: true}], 1, 15, '')
    .then(result => {
      dispatch(setLoading(false));
      if (result && result.products) {
        dispatch({
          type: Actions.GET_NEW_ARRIVALS,
          data: result.products,
          name: 'newArrivals'
        });
      }
    }).catch(err => {
      dispatch(setLoading(false));
      console.log('get new products request failed', err);
    });
};

export const getBestsellers = (perPage) => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.Products.getProductsByFilters([{bestseller: true}], 1, perPage, '')
    .then(result => {
      dispatch(setLoading(false));
      if (result && result.products) {
        dispatch({
          type: Actions.GET_BESTSELLERS,
          payload: result.products
        });
      }
    }).catch(err => {
      dispatch(setLoading(false));
      console.log('get best sellers request failed', err);
    });
};

export const getRecentlyViewed = (productId) => dispatch => {
  const dataFromStorage = getStorageData('recentlyViewed');
  const filterArray = dataFromStorage.length ? [{_id: dataFromStorage}] : [];
  if (filterArray.length) {
    dispatch(setLoading(true));
    AjaxUtils.Products.getProductsByFilters(filterArray, 1, 8, '')
      .then(result => {
        dispatch(setLoading(false));
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
            wrongId = findBadId(message);
          }
          setStorageData('recentlyViewed', [...dataFromStorage.filter(item => item !== wrongId)]);
          getRecentlyViewed(productId);
        }
      }).catch(err => {
        dispatch(setLoading(false));
        console.log('get recently viewed products request failed', err);
      });
  }
};

export const searchProducts = (searchString) => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.Products.searchProducts(searchString)
    .then(result => {
      dispatch(setLoading(false));
      if (result) {
        dispatch({
          type: Actions.SEARCH_PRODUCTS,
          products: result.products,
          totalCount: result.totalCount
        });
      }
    }).catch(err => {
      dispatch(setLoading(false));
      console.log('search products request failed', err);
    });
};

export const getAllProducts = (startPage, perPage, sort) => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.Products.getAllProducts(startPage, perPage, sort)
    .then(result => {
      dispatch(setLoading(false));
      if (result && result.products) {
        dispatch({
          type: Actions.GET_ALL_PRODUCTS,
          products: result.products,
          total: result.totalCount
        });
      }
    }).catch(err => {
      dispatch(setLoading(false));
      console.log('get all products request failed', err);
    });
};