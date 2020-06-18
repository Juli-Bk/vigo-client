import Actions from '../constants/constants';

const reducer = (state = [], action) => {
  if (action.type === Actions.SET_CART_DATA) {
    return [...state, action.payload];
  }
  return state;
};

export default reducer;