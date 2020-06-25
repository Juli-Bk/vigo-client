import Actions from '../constants/constants';

const reducer = (state = false, action) => {
  if (action.type === Actions.SET_SNACK_MESSAGE_OPEN) {
    return {isOpen: action.payload};
  }
  return state;
};

export default reducer;