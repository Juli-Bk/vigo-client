import Actions from '../constants/constants';

const priceRange = (state = [100, 1000], action) => {
  if (action.type === Actions.SET_PRICE_RANGE) {
    return action.payload;
  }
  return state;
};

export default priceRange;