import Actions from '../constants/constants';

const reducer = (state = [], action) => {
  if (action.type === Actions.SET_CATEGORIES_LIST) {
    return action.payload;
  }
  return state;
};

export default reducer;