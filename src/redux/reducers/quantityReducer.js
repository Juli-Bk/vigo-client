import Actions from '../constants/constants';

const reducer = (state = [], action) => {
  if (action.type === Actions.GET_PRODUCTS_QUANTITY) {
    if (!state.find(item => item.productId === action.productId)) {
      return [...state, {productId: action.productId, inStock: action.payload}];
    }
  }
  return state;
};

export default reducer;