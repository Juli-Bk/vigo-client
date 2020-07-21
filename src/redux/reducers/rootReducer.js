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
import userOrders from './userOrdersReducer';
import product from './productReducer';
import checkoutPossible from './checkoutPossibleReducer';

export const rootReducer = combineReducers({
  token,
  user,
  userOrders,
  guestData,
  snackMessage,
  categories,
  productsOptions: combineReducers({
    currentPage,
    sortingOption,
    view
  }),
  checkout: combineReducers({
    totalSum,
    checkoutSteps,
    orderDetails,
    checkoutPossible
  }),
  userChoice: combineReducers({
    wishList,
    compareList,
    shoppingCart
  }),
  stock: combineReducers({
    allColors,
    maxPrice,
    allSizes,
    sizeTable,
    quantity,
    product,
    products,
    currentProduct
  }),
  modals: combineReducers({
    isLoginModalOpen,
    isPersDetailsModalOpen,
    isModalSizeOpen,
    isAddressModalOpen,
    isRestorePswdModalOpen
  }),
  stateFlags: combineReducers({
    userIsLoggedIn,
    isLoading,
    isPopoverOpen,
    isSearchBarOpen,
    isMenuOpen
  })
});