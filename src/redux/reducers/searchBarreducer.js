import Actions from '../constants/constants';

const reducer = (state = false, action) => {
  if (action.type === Actions.TOGGLE_SEARCH_BAR_OPEN) {
    return action.payload;
  }
  return state;
};

export default reducer;