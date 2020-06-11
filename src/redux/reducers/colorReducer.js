import Actions from '../constants/constants';

const colors = (state = [], action) => {
  if (action.type === Actions.SET_CHOSEN_COLOR) {
    return [...state, action.payload];
  }
  return state;
};

export default colors;