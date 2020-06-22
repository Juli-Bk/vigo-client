import Actions from '../constants/constants';

const reducer = (state = [], action) => {
  if (action.type === Actions.GET_PRODUCTS_BY_FILTERS) {
    return action.payload;
  }
  return state;
};

export default reducer;