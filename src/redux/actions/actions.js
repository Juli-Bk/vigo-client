import Actions from '../constants/constants';

export const setCurrentPage = (pageNumber) => {
  return {type: Actions.SET_CURRENT_PAGE, payload: pageNumber};
};

export const setProductsPerPage = (amount) => {
  return {type: Actions.SET_PRODUCTS_PER_PAGE, payload: amount};
};

export const setChosenView = (view) => ({
  type: Actions.SET_CHOSEN_VIEW,
  payload: view
});

export const setJWTtoken = (token) => {
  return {type: Actions.SET_JWT_TOKEN, payload: token};
};

export const setSortingOption = (option) => {
  return {type: Actions.SET_SORTING_OPTION, payload: option};
};

export const setPriceRange = (values) => {
  return {type: Actions.SET_PRICE_RANGE, payload: values};
};

export const setCategories = (caregoties) => {
  return {type: Actions.SET_CATEGORIES_LIST, payload: caregoties};
};

export const toggleMenuOpen = (isOpen) => {
  return {type: Actions.TOGGLE_MENU_OPEN, payload: isOpen};
};

export const toggleSearchBarOpen = (isOpen) => {
  return {type: Actions.TOGGLE_SEARCH_BAR_OPEN, payload: isOpen};
};

export const setChosenSize = (size) => {
  return {type: Actions.SET_CHOSEN_SIZE, payload: size};
};

export const setChosenQuantity = (quantity) => {
  return {type: Actions.SET_CHOSEN_QUANTITY, payload: quantity};
};

export const setRecentlyViewed = (item) => {
  return {type: Actions.SET_RECENTLY_VIEWED, payload: item};
};
