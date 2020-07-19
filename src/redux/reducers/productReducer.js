import Actions from '../constants/constants';

const productReducer = (state = null, action) => {
  if (action.type === Actions.SET_PRODUCT) {
    return action.payload;
  }
  return state;
};

export default productReducer;