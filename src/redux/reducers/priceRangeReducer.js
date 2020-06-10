import Actions from '../constants/constants';
import globalConfig from '../../globalConfig';

const priceRange = (state = [globalConfig.minDefaultPrice, globalConfig.maxDefaultPrice], action) => {
  if (action.type === Actions.SET_PRICE_RANGE) {
    return action.payload;
  }
  return state;
};

export default priceRange;