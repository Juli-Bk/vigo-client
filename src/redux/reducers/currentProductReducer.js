import Actions from '../constants/constants';

const reducer = (state = {}, action) => {
  if (action.type === Actions.SET_CURRENT_PRODUCT) {
    return action.payload;
  }
  return state;
};

export default reducer;