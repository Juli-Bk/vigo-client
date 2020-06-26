import Actions from '../constants/constants';
import globalConfig from '../../globalConfig';

const initValue = [globalConfig.minDefaultPrice, globalConfig.maxDefaultPrice];

const priceRange = (state = initValue, action) => {
  if (action.type === Actions.SET_PRICE_RANGE) {
    return action.payload;
  }
  return state;
};

export default priceRange;