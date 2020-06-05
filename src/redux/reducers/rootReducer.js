import { combineReducers } from 'redux';
import currentPage from './paginationReducer';
import token from './tokenReducer';
import productsPerPage from './productsPerPageReducer';
import sortingOption from './sortReducer';
import priceRange from './priceRangeReducer';
import view from './viewAsReducer';
import categories from './categoriesReducer';
import isMenuOpen from './menuReducer';
import isSearchBarOpen from './searchBarreducer';
import size from './currentSizeReducer';
import quantity from './quantityReducer';
import recentlyViewed from './recentlyViewedReducer';

export const rootReducer = combineReducers({
  currentPage,
  sortingOption,
  priceRange,
  productsPerPage,
  view,
  token,
  categories,
  isMenuOpen,
  size,
  quantity,
  recentlyViewed,
  isSearchBarOpen
});
