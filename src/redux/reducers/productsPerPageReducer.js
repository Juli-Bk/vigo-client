import Actions from '../constants/constants';
import globalConfig from '../../globalConfig';

const productsPerPage = (state = globalConfig.step, action) => {
  if (action.type === Actions.SET_PRODUCTS_PER_PAGE) {
    return action.payload;
  }
  return state;
};

export default productsPerPage;