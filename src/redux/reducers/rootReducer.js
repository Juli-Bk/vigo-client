import { combineReducers } from 'redux';
import currentPage from './currentPageReducer';
import token from './tokenReducer';
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
import products from './productsReducer';
import currentProduct from './currentProductReducer';
import allColors from './allColorsReducer';
import maxPrice from './maxPriceReducer';
import allSizes from './allSizesReducer';
import isPopoverOpen from './isPopoverOpenReducer';
import snackMessage from './isSnackMessageOpenReducer';
import isRestorePswdModalOpen from './isRestorePswdModalOpen';
import userIsLoggedIn from './isLoggedReducer';
import totalSum from './totalSumReducer';
import sizeTable from './sizeTableReducer';
import orderDetails from './orderReducer';
import checkoutSteps from './checkoutStepsReducer';
import compareList from './compareListReducer';

export const rootReducer = combineReducers({
  currentPage,
  sortingOption,
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
  snackMessage,
  userIsLoggedIn,
  totalSum,
  isRestorePswdModalOpen,
  sizeTable,
  orderDetails,
  checkoutSteps,
  compareList
});
