import { combineReducers } from 'redux';
import currentPage from './currentPageReducer';
import token from './tokenReducer';
import productsPerPage from './productsPerPageReducer';
import sortingOption from './sortReducer';
import view from './viewAsReducer';
import categories from './categoriesReducer';
import isMenuOpen from './menuReducer';
import isSearchBarOpen from './searchBarreducer';
import quantity from './quantityReducer';
import wishList from './wishListReducer';
import user from './userReducer';
import isLoginModalOpen from './isLoginModalOpenReducer';
import isAddressModalOpen from './isAddressModalOpenReducer';
import isPersDetailsModalOpen from './isPersDetailsModalOpenReducer';
import isLoading from './isLoadingReducer';
import shoppingCart from './shoppingCartReducer';
import guestData from './guestReducer';
import isModalSizeOpen from './modalSizeReducer';
import products from './productsByFiltersReducer';
import currentProduct from './currentProductReducer';
import allColors from './allColorsReducer';
import maxPrice from './maxPriceReducer';
import allSizes from './allSizesReducer';
import isPopoverOpen from './isPopoverOpenReducer';
import snackMessage from './isSnackMessageOpenReducer';
import userIsLoggedIn from './isLoggedReducer';
import filters from './filtersReducer';
import totalSum from './totalSumReducer';

export const rootReducer = combineReducers({
  currentPage,
  sortingOption,
  productsPerPage,
  view,
  token,
  categories,
  isMenuOpen,
  quantity,
  isSearchBarOpen,
  wishList,
  user,
  isLoginModalOpen,
  isPersDetailsModalOpen,
  shoppingCart,
  guestData,
  isModalSizeOpen,
  products,
  currentProduct,
  isAddressModalOpen,
  allColors,
  maxPrice,
  allSizes,
  isLoading,
  isPopoverOpen,
  filters,
  snackMessage,
  userIsLoggedIn,
  totalSum
});
