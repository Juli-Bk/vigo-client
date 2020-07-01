import Actions from '../constants/constants';

const reducer = (state = [], action) => {
  if (action.type === Actions.SET_CART_PRODUCTS) {
    return action.payload;
  }
  return state;
};

export default reducer;