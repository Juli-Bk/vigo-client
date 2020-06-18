import Actions from '../constants/constants';
import globalConfig from '../../globalConfig';

const reducer = (state = globalConfig.defaultQuantity, action) => {
  if (action.type === Actions.SET_CHOSEN_QUANTITY) {
    return action.payload;
  }
  return state;
};

export default reducer;