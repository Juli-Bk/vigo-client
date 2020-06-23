import Actions from '../constants/constants';

const reducer = (state = {}, action) => {
  if (action.type === Actions.GET_ALL_SIZES) {
    return {items: action.items, names: action.names};
  }
  return state;
};

export default reducer;