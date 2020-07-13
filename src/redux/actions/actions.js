import Actions from '../constants/constants';
import { getStorageData, setStorageData } from '../../helpers/helpers';

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

export const setNewPassModalOpenState = (isOpen) => {
  return {type: Actions.IS_NEW_PASS_MODAL_OPEN, payload: isOpen};
};

export const setAddressModalOpenState = (isOpen) => {
  return {type: Actions.IS_ADDRESS_MODAL_OPEN, payload: isOpen};
};

export const setPersDetailsOpenState = (isOpen) => {
  return {type: Actions.IS_PERSONAL_DETAILS_MODAL_OPEN, payload: isOpen};
};

export const setGuestData = (data) => {
  if (!data) {
    const storageData = getStorageData('guestData');
    const data = Array.isArray(storageData) ? {} : storageData;
    return {type: Actions.SET_GUEST_DATA, payload: data};
  }
  setStorageData('guestData', data);
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

export const setCompletedSteps = (step) => {
  return {type: Actions.SET_COMPLETED_STEPS, payload: step};
};

export const setActiveStep = (step) => {
  const data = JSON.stringify(step);
  localStorage.setItem('activeStep', data);
  return {type: Actions.SET_ACTIVE_STEP, payload: step};
};

export const changeCompareList = (productId) => {
  if (!productId) {
    const compareList = getStorageData('compareList');
    return {type: Actions.CHANGE_COMPARE_LIST, payload: compareList};
  } else {
    const compareList = getStorageData('compareList');
    let updatedList;

    if (compareList.length && compareList.find(item => item === productId)) {
      updatedList = compareList.filter(item => item !== productId);
    } else {
      updatedList = [...compareList, productId];
    }

    setStorageData('compareList', updatedList);
    return {type: Actions.CHANGE_COMPARE_LIST, payload: updatedList};
  }
};