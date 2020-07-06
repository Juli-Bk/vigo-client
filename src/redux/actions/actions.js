import Actions from '../constants/constants';

export const setCurrentPage = (pageNumber) => {
  return {type: Actions.SET_CURRENT_PAGE, payload: pageNumber};
};

export const setChosenView = (view) => ({
  type: Actions.SET_CHOSEN_VIEW,
  payload: view
});

export const setSortingOption = (option) => {
  return {type: Actions.SET_SORTING_OPTION, payload: option};
};

export const toggleMenuOpen = (isOpen) => {
  return {type: Actions.TOGGLE_MENU_OPEN, payload: isOpen};
};

export const toggleSearchBarOpen = (isOpen) => {
  return {type: Actions.TOGGLE_SEARCH_BAR_OPEN, payload: isOpen};
};

export const setLoginModalOpenState = (isOpen) => {
  return {type: Actions.IS_LOGIN_MODAL_OPEN, payload: isOpen};
};

export const setRestorePswdModalOpen = (isOpen) => {
  return {type: Actions.IS_RESTORE_MODAL_OPEN, payload: isOpen};
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
  return {type: Actions.SET_POPOVER_OPEN, payload: isOpen};
};

export const setSnackMessage = (isOpen, message, severity) => {
  return {
    type: Actions.SET_SNACK_MESSAGE_OPEN,
    payload: isOpen,
    message,
    severity
  };
};

export const setLoading = (isLoading) => {
  return {type: Actions.SET_LOADING_PROCESS, payload: isLoading};
};

export const toggleModalSize = (flag) => {
  return {type: Actions.IS_MODAL_SIZE_OPEN, payload: flag};
};

export const setCurrentProduct = (product) => {
  return {type: Actions.SET_CURRENT_PRODUCT, payload: product};
};

export const setShipping = (shipping) => {
  return {type: Actions.SET_SHIPPING, payload: shipping};
};

export const setPaymentMethod = (paymentMethod) => {
  return {type: Actions.SET_PAYMENT_METHOD, payload: paymentMethod};
};