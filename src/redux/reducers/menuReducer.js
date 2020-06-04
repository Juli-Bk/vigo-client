import Actions from '../constants/constants';

const reducer = (state = false, action) => {
  if (action.type === Actions.TOGGLE_MENU_OPEN) {
    return action.payload;
  }
  return state;
};

export default reducer;