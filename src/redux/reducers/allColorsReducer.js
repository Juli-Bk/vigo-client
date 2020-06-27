import Actions from '../constants/constants';

const reducer = (state = [], action) => {
  if (action.type === Actions.GET_ALL_COLORS) {
    return action.payload;
  }
  return state;
};

export default reducer;