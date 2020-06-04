import Actions from '../constants/constants';

const reducer = (state = [], action) => {
  if (action.type === Actions.SET_RECENTLY_VIEWED) {
    if (!state.includes(action.payload)) {
      if (state.length > 8) {
        return [...(state.filter(item => item !== state[0])), action.payload];
      }
      return [...state, action.payload];
    }
  }
  return state;
};

export default reducer;