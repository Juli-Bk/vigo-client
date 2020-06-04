import Actions from '../constants/constants';

const reducer = (state = 1, action) => {
  if (action.type === Actions.SET_CHOSEN_QUANTITY) {
    return action.payload;
  }
  return state;
};

export default reducer;