import Actions from '../constants/constants';

const reducer = (state = 'Select Size', action) => {
  if (action.type === Actions.SET_CHOSEN_SIZE) {
    return action.payload;
  }
  return state;
};

export default reducer;