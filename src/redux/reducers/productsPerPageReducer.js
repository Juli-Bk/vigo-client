import Actions from '../constants/constants';

const productsPerPage = (state = 15, action) => {
  if (action.type === Actions.SET_PRODUCTS_PER_PAGE) {
    return action.payload;
  }
  return state;
};

export default productsPerPage;