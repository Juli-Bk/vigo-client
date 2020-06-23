import Actions from '../constants/constants';

const reducer = (state = [], action) => {
  if (action.type === Actions.GET_PRODUCTS_QUANTITY) {
    const itemInState = state.find(item => item.productId === action.productId);
    if (!itemInState) {
      const item = {productId: action.productId, inStock: action.payload};
      return [...state, item];
    }
  }
  return state;
};

export default reducer;