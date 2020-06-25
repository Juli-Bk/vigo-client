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

export const setSortingOption = (option) => {
  return {type: Actions.SET_SORTING_OPTION, payload: option};
};

export const setPriceRange = (values) => {
  return {type: Actions.SET_PRICE_RANGE, payload: values};
};

export const setChosenColor = (color) => {
  return {type: Actions.SET_CHOSEN_COLOR, payload: color};
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

export const setLoginModalOpenState = (isOpen) => {
  return {type: Actions.IS_LOGIN_MODAL_OPEN, payload: isOpen};
};

export const setAddressModalOpenState = (isOpen) => {
  return {type: Actions.IS_ADDRESS_MODAL_OPEN, payload: isOpen};
};

export const setPersDetailsOpenState = (isOpen) => {
  return {type: Actions.IS_PERSONAL_DETAILS_MODAL_OPEN, payload: isOpen};
};

export const setGuestData = (data) => {
  return {type: Actions.SET_GUEST_DATA, payload: data};
};

export const setPopoverOpenState = (isOpen) => {
  return {type: Actions.SET_POPOVER_OPEN, isOpen: isOpen};
};

export const setSnackMessageState = (isOpen) => {
  return {type: Actions.SET_SNACK_MESSAGE_OPEN, isOpen: isOpen};
};

export const setLoading = (isLoading) => {
  // todo use this action for Loader/spinner
  return {type: Actions.SET_LOADING_PROCESS, payload: isLoading};
};
