import Actions from '../constants/constants';

const reducer = (state = true, action) => {
  if (action.type === Actions.SET_IS_CONNECTED) {
    return action.payload;
  }
  return state;
};

export default reducer;