import Actions from '../constants/constants';

const reducer = (state = [], action) => {
  if (action.type === Actions.SET_CHOSEN_SIZE) {
    if (state.includes(action.payload)) {
      return state.filter(item => item !== action.payload) || [];
    } else {
      return [...state, action.payload];
    }
  }
  return state;
};

export default reducer;