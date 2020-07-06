import Actions from '../constants/constants';

const reducer = (state = [], action) => {
  if (action.type === Actions.CHANGE_SHOPPING_CART) {
    return action.payload;
  }
  return state;
};

export default reducer;