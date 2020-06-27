import Actions from '../constants/constants';

const reducer = (state = 0, action) => {
  if (action.type === Actions.GET_MAX_PRICE) {
    return action.payload;
  }
  return state;
};

export default reducer;